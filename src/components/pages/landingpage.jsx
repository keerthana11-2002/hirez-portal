 import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "@/data/companies";
import logo2 from "@/assets/logo2.png";
import banner from "@/assets/banner.png";
import faqs from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const LandingPage = () => {
  return (
    <main className="xl:ml-96 p-4 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-16 py-8 sm:py-12 lg:py-20 ">
      <section className="text-center mx-auto ">
        <h1 className="flex flex-col items-center justify-center gradient-title font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl tracking-tighter py-4">
          Unlock your potential,
          <span className="mt-2 md:mt-3 xl:mb-6 lg:mt-4 xl:mt-5 mb-3 ">land your dream job</span>
          <span className="flex items-center gap-2  xl:text-7xl sm:gap-4 md:gap-5 lg:gap-6 ">
            with
            <img
              src={logo2}
              className="h-12  sm:h-14 md:h-20 lg:h-28 xl:h-24"
              alt="Hirez Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl tracking-tighter">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center mt-4">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl" className="w-full sm:w-auto">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl" className="w-full sm:w-auto">
            Post a Job
          </Button>
        </Link>
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full  py-6 sm:py-8 md:py-10"
      >
        <CarouselContent className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8">
              <img
                src={path}
                alt={name}
                className="h-10 sm:h-10 md:h-12 lg:h-16 xl:h-20 object-contain mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <img src={banner} className="w-full h-auto object-cover rounded-md" alt="Banner" />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base md:text-lg lg:text-xl">
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base md:text-lg lg:text-xl">
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full text-sm md:text-base lg:text-lg xl:text-xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="lg:text-lg xl:text-xl">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
