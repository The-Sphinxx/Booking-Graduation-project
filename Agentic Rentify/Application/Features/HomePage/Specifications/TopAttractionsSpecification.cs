using Agentic_Rentify.Application.Specifications;
using Agentic_Rentify.Core.Entities;

namespace Agentic_Rentify.Application.Features.HomePage.Specifications;

public sealed class TopAttractionsSpecification(int take)
    : BaseSpecification<Attraction>(
        attraction => !attraction.IsDeleted,
        orderBy: null,
        orderByDescending: attraction => attraction.Rating,
        skip: 0,
        take: Math.Max(1, take),
        isPagingEnabled: true)
{
}
