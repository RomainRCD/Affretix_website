import Link from 'next/link'

type ButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-block font-body font-semibold px-6 py-3 transition-colors text-sm uppercase tracking-wide'
  const variants = {
    primary: 'bg-orange text-white hover:bg-orange/90',
    secondary: 'bg-transparent text-orange border border-orange hover:bg-orange hover:text-white',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}
