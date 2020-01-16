import React from 'react'
import { Link } from 'gatsby'

const links: string[] = ['About', 'Team', 'Products', 'Apply']

export const Links = () => (
  <>
    {links.map((link: string) => (
      <Link to={`/${link.toLowerCase()}`} key={link}>
        {link}
      </Link>
    ))}
  </>
)
