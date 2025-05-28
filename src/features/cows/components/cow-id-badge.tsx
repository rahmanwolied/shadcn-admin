import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CowCategories, cowTypes } from '../data/data'

interface Props {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  cowType: CowCategories
}

export default function CowIdBadge({
  children,
  className = '',
  contentClassName = '',
  cowType,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const badgeColor = cowTypes.get(cowType ?? 'indian')

  return (
    <>
      <div className='hidden sm:block'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex space-x-2'>
                <Badge
                  variant='outline'
                  className={cn('capitalize', badgeColor)}
                >
                  <div ref={ref} className={className}>
                    {children}
                  </div>
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={contentClassName}>
                {cowType[0].toUpperCase() + cowType.slice(1)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='sm:hidden'>
        <Popover>
          <PopoverTrigger asChild>
            <div className='flex space-x-2'>
              <Badge variant='outline' className={cn('capitalize', badgeColor)}>
                <div ref={ref} className={className}>
                  <div ref={ref} className={className}>
                    {children}
                  </div>
                </div>
              </Badge>
            </div>
          </PopoverTrigger>
          <PopoverContent className={cn('w-fit', contentClassName)}>
            <p>{cowType}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
