using Agentic_Rentify.Application.Specifications;
using Agentic_Rentify.Core.Entities;

namespace Agentic_Rentify.Application.Features.HomePage.Specifications;

public sealed class TopHotelsSpecification(int take)
    : BaseSpecification<Hotel>(
        hotel => !hotel.IsDeleted,
        orderBy: null,
        orderByDescending: hotel => hotel.Rating,
        skip: 0,
        take: Math.Max(1, take),
        isPagingEnabled: true)
{
}
