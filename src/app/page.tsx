import { Hero } from '@/components/home/Hero'
import { FamilyGrid } from '@/components/home/FamilyGrid'
import { Reassurance } from '@/components/home/Reassurance'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FamilyGrid />
      <Reassurance />
      <ContactCTA />
    </>
  )
}
