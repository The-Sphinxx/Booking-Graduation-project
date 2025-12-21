using Agentic_Rentify.Application.Specifications;
using Agentic_Rentify.Core.Entities;

namespace Agentic_Rentify.Application.Features.HomePage.Specifications;

public sealed class TopCarsSpecification(int take)
    : BaseSpecification<Car>(
        car => !car.IsDeleted,
        orderBy: null,
        orderByDescending: car => car.Price,
        skip: 0,
        take: Math.Max(1, take),
        isPagingEnabled: true)
{
}
