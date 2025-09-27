import { AppLayout } from "@/components/layout/app-layout"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Grid, GridItem } from "@/components/layout/grid"
import { Flex } from "@/components/layout/flex"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { ResponsiveWrapper } from "@/components/layout/responsive-wrapper"
import { Button } from "@/components/ui/button"
import { Typography } from "@mui/material"
import {
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Computer as ComputerIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material"

const features = [
  {
    icon: SmartphoneIcon,
    title: "Mobile First",
    description: "Designed with mobile users in mind, ensuring perfect experience on all devices.",
  },
  {
    icon: TabletIcon,
    title: "Responsive Design",
    description: "Seamlessly adapts to any screen size with fluid layouts and flexible components.",
  },
  {
    icon: ComputerIcon,
    title: "Desktop Optimized",
    description: "Rich desktop experience with advanced features and intuitive navigation.",
  },
  {
    icon: SpeedIcon,
    title: "High Performance",
    description: "Built with Next.js and optimized for speed with server-side rendering.",
  },
  {
    icon: SecurityIcon,
    title: "Secure by Default",
    description: "Integrated authentication and security features with Supabase backend.",
  },
  {
    icon: PaletteIcon,
    title: "Modern UI",
    description: "Beautiful interface combining Material-UI components with Tailwind CSS.",
  },
]

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <Section padding="xl" background="default">
        <Container maxWidth="xl">
          <ResponsiveWrapper
            mobileLayout={
              <Flex direction="col" align="center" justify="center" gap="lg" className="text-center">
                <Typography variant="h3" className="text-foreground font-bold text-balance">
                  {"Modern Responsive Web Application"}
                </Typography>
                <Typography variant="h6" className="text-muted-foreground max-w-md text-pretty">
                  {
                    "Built with Next.js, MUI, Tailwind CSS, Framer Motion, Redux, and Supabase for the ultimate development experience."
                  }
                </Typography>
                <Flex direction="col" gap="sm" className="w-full max-w-sm">
                  <Button size="large" className="w-full">
                    {"Get Started"}
                  </Button>
                  <Button variant="outline" size="large" className="w-full bg-transparent">
                    {"Learn More"}
                  </Button>
                </Flex>
              </Flex>
            }
            desktopLayout={
              <Flex align="center" justify="between" gap="xl">
                <div className="flex-1">
                  <Typography variant="h2" className="text-foreground font-bold mb-6 text-balance">
                    {"Modern Responsive Web Application"}
                  </Typography>
                  <Typography variant="h5" className="text-muted-foreground mb-8 text-pretty">
                    {
                      "Built with Next.js, MUI, Tailwind CSS, Framer Motion, Redux, and Supabase for the ultimate development experience."
                    }
                  </Typography>
                  <Flex gap="md">
                    <Button size="large">{"Get Started"}</Button>
                    <Button variant="outline" size="large">
                      {"Learn More"}
                    </Button>
                  </Flex>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <Typography variant="h4" className="text-muted-foreground">
                      {"Hero Image"}
                    </Typography>
                  </div>
                </div>
              </Flex>
            }
          />
        </Container>
      </Section>

      {/* Features Section */}
      <Section padding="xl" background="muted">
        <Container maxWidth="xl">
          <div className="text-center mb-12">
            <Typography variant="h3" className="text-foreground font-bold mb-4 text-balance">
              {"Powerful Features"}
            </Typography>
            <Typography variant="h6" className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              {"Everything you need to build modern, responsive web applications with the latest technologies."}
            </Typography>
          </div>

          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg" stagger>
            {features.map((feature, index) => (
              <GridItem key={feature.title}>
                <ResponsiveCard
                  header={
                    <Flex align="center" gap="md">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="text-primary" />
                      </div>
                      <Typography variant="h6" className="text-foreground font-semibold">
                        {feature.title}
                      </Typography>
                    </Flex>
                  }
                  hover
                  animate
                >
                  <Typography variant="body1" className="text-muted-foreground text-pretty">
                    {feature.description}
                  </Typography>
                </ResponsiveCard>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" background="default">
        <Container maxWidth="md">
          <div className="text-center">
            <Typography variant="h3" className="text-foreground font-bold mb-4 text-balance">
              {"Ready to Get Started?"}
            </Typography>
            <Typography variant="h6" className="text-muted-foreground mb-8 text-pretty">
              {"Join thousands of developers building amazing applications with our modern stack."}
            </Typography>
            <ResponsiveWrapper
              mobileLayout={
                <Flex direction="col" gap="sm" className="max-w-sm mx-auto">
                  <Button size="large" className="w-full">
                    {"Start Building"}
                  </Button>
                  <Button variant="outline" size="large" className="w-full bg-transparent">
                    {"View Documentation"}
                  </Button>
                </Flex>
              }
              desktopLayout={
                <Flex justify="center" gap="md">
                  <Button size="large">{"Start Building"}</Button>
                  <Button variant="outline" size="large">
                    {"View Documentation"}
                  </Button>
                </Flex>
              }
            />
          </div>
        </Container>
      </Section>
    </AppLayout>
  )
}
