using Agentic_Rentify.Application.Interfaces;
using Agentic_Rentify.Core.Entities;
using Agentic_Rentify.Core.Enums;
using Agentic_Rentify.Core.Exceptions;
using MediatR;

namespace Agentic_Rentify.Application.Features.Bookings.Commands.PatchBooking;

public class PatchBookingCommandHandler : IRequestHandler<PatchBookingCommand, int>
{
    private readonly IUnitOfWork _unitOfWork;

    public PatchBookingCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<int> Handle(PatchBookingCommand request, CancellationToken cancellationToken)
    {
        var booking = await _unitOfWork.Repository<Booking>().GetByIdAsync(request.Id);
        if (booking == null)
            throw new NotFoundException($"Booking with ID {request.Id} not found");

        // Update only provided fields
        if (request.Status != null)
        {
            if (Enum.TryParse<BookingStatus>(request.Status, true, out var status))
                booking.Status = status;
        }

        if (request.PaymentStatus != null)
        {
            if (Enum.TryParse<PaymentStatus>(request.PaymentStatus, true, out var paymentStatus))
            {
                booking.PaymentStatus = paymentStatus;
                // Sync IsPaid field with PaymentStatus for backward compatibility
                booking.IsPaid = paymentStatus == PaymentStatus.Paid;
            }
        }

        if (request.StartDate.HasValue)
            booking.StartDate = request.StartDate.Value;

        if (request.EndDate.HasValue)
            booking.EndDate = request.EndDate.Value;

        if (request.TotalPrice.HasValue)
            booking.TotalPrice = request.TotalPrice.Value;

        // Update timestamp
        booking.UpdatedAt = DateTime.UtcNow;

        await _unitOfWork.Repository<Booking>().UpdateAsync(booking);
        await _unitOfWork.CompleteAsync();

        return booking.Id;
    }
}
