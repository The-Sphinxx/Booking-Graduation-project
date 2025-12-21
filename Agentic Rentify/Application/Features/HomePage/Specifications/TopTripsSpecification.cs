using Agentic_Rentify.Application.Specifications;
using Agentic_Rentify.Core.Entities;

namespace Agentic_Rentify.Application.Features.HomePage.Specifications;

public sealed class TopTripsSpecification(int take)
    : BaseSpecification<Trip>(
        trip => !trip.IsDeleted,
        orderBy: null,
        orderByDescending: trip => trip.Rating,
        skip: 0,
        take: Math.Max(1, take),
        isPagingEnabled: true)
{
}
