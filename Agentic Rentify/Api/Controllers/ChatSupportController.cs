using Agentic_Rentify.Application.Features.Chat.Commands.SendMessage;
using Agentic_Rentify.Application.Features.Chat.Queries.GetActiveConversations;
using Agentic_Rentify.Application.Features.Chat.Queries.GetChatHistory;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Agentic_Rentify.Api.Controllers;

/// <summary>
/// Real-time chat system for Client-Admin communication (REST endpoints, see ChatHub for WebSocket)
/// </summary>
[ApiController]
[Route("api/chat")]
[Produces("application/json")]
[ApiExplorerSettings(GroupName = "Chat System")]
public class ChatSupportController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Get all active conversations (Admin sees all, Client sees only their own)
    /// </summary>
    [HttpGet("conversations")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetConversations()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;
        var isAdmin = role?.Equals("Admin", StringComparison.OrdinalIgnoreCase) ?? false;

        var conversations = await mediator.Send(new GetActiveConversationsQuery
        {
            UserId = userId,
            IsAdmin = isAdmin
        });

        return Ok(conversations);
    }

    /// <summary>
    /// Get chat history for a specific conversation
    /// </summary>
    [HttpGet("conversations/{conversationId}/messages")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHistory(int conversationId)
    {
        var messages = await mediator.Send(new GetChatHistoryQuery(conversationId));
        return Ok(messages);
    }

    /// <summary>
    /// Send a message (creates conversation if new)
    /// </summary>
    [HttpPost("messages")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageCommand command)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst(ClaimTypes.Name)?.Value ?? "User";
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { message = "User not authenticated" });
        }

        command.SenderId = userId;
        command.SenderName = userName;
        command.SenderRole = role?.Equals("Admin", StringComparison.OrdinalIgnoreCase) == true 
            ? Agentic_Rentify.Core.Enums.ChatRole.Admin 
            : Agentic_Rentify.Core.Enums.ChatRole.Client;

        var message = await mediator.Send(command);
        return Ok(message);
    }
}
