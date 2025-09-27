import { AppLayout } from "@/components/layout/app-layout"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Grid, GridItem } from "@/components/layout/grid"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { Typography } from "@mui/material"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    icon: Users,
  },
  {
    title: "Sales",
    value: "12,234",
    change: "+19%",
    icon: ShoppingCart,
  },
  {
    title: "Growth",
    value: "573",
    change: "+201%",
    icon: TrendingUp,
  },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <Section padding="lg">
        <Container maxWidth="xl">
          <div className="mb-8">
            <Typography variant="h4" className="text-foreground font-bold mb-2">
              {"Dashboard"}
            </Typography>
            <Typography variant="body1" className="text-muted-foreground">
              {"Welcome back! Here's what's happening with your application."}
            </Typography>
          </div>

          <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap="lg" className="mb-8">
            {stats.map((stat) => (
              <GridItem key={stat.title}>
                <ResponsiveCard hover animate>
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="body2" className="text-muted-foreground mb-1">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" className="text-foreground font-bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" className="text-green-600 font-medium">
                        {stat.change}
                      </Typography>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </ResponsiveCard>
              </GridItem>
            ))}
          </Grid>

          <Grid cols={{ default: 1, lg: 2 }} gap="lg">
            <GridItem>
              <ResponsiveCard
                header={
                  <Typography variant="h6" className="text-foreground font-semibold">
                    {"Recent Activity"}
                  </Typography>
                }
                animate
              >
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <Typography variant="body2" className="text-foreground">
                          {`Activity item ${item}`}
                        </Typography>
                        <Typography variant="caption" className="text-muted-foreground">
                          {"2 hours ago"}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </ResponsiveCard>
            </GridItem>

            <GridItem>
              <ResponsiveCard
                header={
                  <Typography variant="h6" className="text-foreground font-semibold">
                    {"Quick Actions"}
                  </Typography>
                }
                animate
              >
                <div className="grid grid-cols-2 gap-4">
                  {["Create", "Import", "Export", "Settings"].map((action) => (
                    <button
                      key={action}
                      className="p-4 bg-muted hover:bg-accent rounded-lg transition-colors text-center"
                    >
                      <Typography variant="body2" className="text-foreground font-medium">
                        {action}
                      </Typography>
                    </button>
                  ))}
                </div>
              </ResponsiveCard>
            </GridItem>
          </Grid>
        </Container>
      </Section>
    </AppLayout>
  )
}
