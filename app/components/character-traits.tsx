import type React from "react"
import { Cog, Heart, Lightbulb, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CharacterTrait {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaRocket":
      return Rocket
    case "FaLightbulb":
      return Lightbulb
    case "FaCogs":
      return Cog
    case "FaHeart":
      return Heart
    default:
      return Rocket
  }
}

const caractereData = [
  {
    icon: "FaRocket",
    title: "Dynamic",
    description: "Always ready to take on new challenges with energy and enthusiasm.",
    color: "text-neonRed",
  },
  {
    icon: "FaLightbulb",
    title: "Creative",
    description: "Turning ideas into concrete solutions to meet specific needs.",
    color: "text-yellow-500",
  },
  {
    icon: "FaCogs",
    title: "Result-Oriented",
    description: "An analytical mind, always focused on practical and effective solutions.",
    color: "text-neonBlue",
  },
  {
    icon: "FaHeart",
    title: "Empathetic",
    description: "Understanding others' needs and collaborating effectively within a team.",
    color: "text-pink-500",
  },
]

export default function CharacterTraits() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {caractereData.map((trait, index) => {
        const IconComponent = getIconComponent(trait.icon)

        return (
          <Card
            key={index}
            className="overflow-hidden border border-border bg-card hover:shadow-neon transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div
                className={`p-3 rounded-full mb-4 ${trait.color === "text-neonRed" ? "text-neonRed" : trait.color === "text-neonBlue" ? "text-neonBlue" : trait.color}`}
              >
                <IconComponent className="h-8 w-8" />
              </div>
              <h3
                className={`font-bold text-xl mb-2 ${trait.color === "text-neonRed" ? "text-neonRed" : trait.color === "text-neonBlue" ? "text-neonBlue" : trait.color}`}
              >
                {trait.title}
              </h3>
              <p className="text-gray-400 text-sm">{trait.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

