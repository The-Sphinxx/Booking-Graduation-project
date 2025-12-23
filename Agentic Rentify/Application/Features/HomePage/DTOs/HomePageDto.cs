using System.Collections.Generic;

namespace Agentic_Rentify.Application.Features.HomePage.DTOs;

public class HomePageDataDto
{
    public HeroSectionDto HeroSection { get; set; } = new();
    public List<HomeTripCardDto> FeaturedTrips { get; set; } = new();
    public List<HomeAttractionCardDto> PopularAttractions { get; set; } = new();
    public List<HomeHotelCardDto> FeaturedHotels { get; set; } = new();
    public List<HomeCarCardDto> FeaturedCars { get; set; } = new();
    public List<HomeTestimonialDto> Testimonials { get; set; } = new();
    public List<WhyChooseUsDto> WhyChooseUs { get; set; } = new();
    public HomeMetadataDto Metadata { get; set; } = new();
}

public class HeroSectionDto
{
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string BackgroundImage { get; set; } = string.Empty;
}

public class HomeTripCardDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public double Rating { get; set; }
    public string Reviews { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}

public class HomeAttractionCardDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty;
    public double Rating { get; set; }
    public string Reviews { get; set; } = string.Empty;
    public bool Featured { get; set; }
    public string Image { get; set; } = string.Empty;
}

public class HomeHotelCardDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Location { get; set; } = string.Empty;
    public double Rating { get; set; }
    public string Reviews { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}

public class HomeCarCardDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}

public class HomeTestimonialDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}

public class WhyChooseUsDto
{
    public int Id { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class HomeMetadataDto
{
    public string SiteName { get; set; } = string.Empty;
    public string PrimaryCtaText { get; set; } = string.Empty;
    public string SecondaryCtaText { get; set; } = string.Empty;
    public string SupportEmail { get; set; } = string.Empty;
    public string SupportPhone { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}
