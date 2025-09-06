using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Plant_Care_Reminder_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class EndpointsController : Controller
    {
        private readonly IActionDescriptorCollectionProvider _provider;

        public EndpointsController(IActionDescriptorCollectionProvider provider)
        {
            _provider = provider;
        }

        [HttpGet("listendpoints")]
        public IActionResult GetAllEndpoints()
        {
            var endpoints = _provider.ActionDescriptors.Items
                .Select(ad => new
                {
                    Route = ad.AttributeRouteInfo?.Template,
                    HttpMethods = ad.ActionConstraints
                        ?.OfType<HttpMethodActionConstraint>()
                        .FirstOrDefault()
                        ?.HttpMethods,
                    Controller = ad.RouteValues["controller"],
                    Action = ad.RouteValues["action"],
                    Parameters = ad.Parameters.Select(p => new
                    {
                        PrNme = p.Name,
                        ParaTyp = p.ParameterType.Name,
                        Source = p.BindingInfo?.BindingSource?.DisplayName
                    })
                });

            return Ok(endpoints);
        }
    }
}
