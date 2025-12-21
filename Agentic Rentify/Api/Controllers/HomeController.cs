using Agentic_Rentify.Application.Features.HomePage.DTOs;
using Agentic_Rentify.Application.Features.HomePage.Queries.GetHomePageData;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Agentic_Rentify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
[ApiExplorerSettings(GroupName = "Landing")]
public class HomeController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<HomePageDataDto>> Get(CancellationToken cancellationToken)
    {
        var response = await mediator.Send(new GetHomePageDataQuery(), cancellationToken);
        return Ok(response);
    }
}
