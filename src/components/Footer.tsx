import Link from 'next/link'
import React from 'react'

function Footer({socials}:any) {

  return (
    <div className='w-full bg-brand h-24'>
        <div className='container h-full'>
            <div className=' flex justify-center items-center gap-8 h-full'>
                {socials.links.map((link: any) => (
                    <Link href={link.link.url} key={link.link.url} target='_blank' className='hover:underline text-background'>
                        {link.link.text}
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Footer