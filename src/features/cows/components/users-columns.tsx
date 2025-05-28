import { ColumnDef } from '@tanstack/react-table'
import { AuthUser } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { callTypes, cowTypes, userTypes } from '../data/data'
import { User } from '../data/schema'
import CowIdBadge from './cow-id-badge'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const getColumns = (user: AuthUser): ColumnDef<User>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'username',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Username' />
  //   ),
  //   cell: ({ row }) => (
  //     <LongText className='max-w-36'>{row.getValue('username')}</LongText>
  //   ),
  //   meta: {
  //     className: cn(
  //       'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
  //       'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
  //       'sticky left-6 md:table-cell'
  //     ),
  //   },
  //   enableHiding: true,
  // },
  {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { firstName } = row.original
      const fullName = `${firstName}`
      return <LongText className='max-w-40'>{fullName}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),

    cell: ({ row }) => (
      <LongText className='max-w-40'>{row.getValue('address')}</LongText>
    ),
    enableSorting: false,
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Email' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
  //   ),
  // },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status ?? 'new')
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'cowId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cow ID' />
    ),
    cell: ({ row }) => {
      const { cowId, cowType } = row.original
      return <CowIdBadge cowType={cowType}>#{cowId}</CowIdBadge>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'cowWeight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Weight (KG)' />
    ),
    cell: ({ row }) => {
      const { cowWeight } = row.original
      return <div className='flex space-x-2'>{cowWeight}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: 'fatPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fat %' />
    ),
    cell: ({ row }) => {
      const { fatPercentage } = row.original
      return <div>{fatPercentage}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    accessorFn: () => {},
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: 'meatPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Meat %' />
    ),

    cell: ({ row }) => {
      const { meatPercentage } = row.original
      return <div>{meatPercentage}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },

    enableHiding: true,
    enableSorting: false,
  },

  {
    accessorKey: 'estimatedSalePrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expected Sale Price' />
    ),
    cell: ({ row }) => <div>৳ {row.getValue('estimatedSalePrice')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'actualSalePrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actual Sale Price' />
    ),
    cell: ({ row }) => <div>৳ {row.getValue('actualSalePrice')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Total Price'
        className='text-right'
      />
    ),
    cell: ({ row }) => (
      <div className='text-right'>
        ৳ {(row.getValue('totalPrice') as number).toLocaleString()}
      </div>
    ),
    enableSorting: true,
  },

  // {
  //   accessorKey: 'role',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Role' />
  //   ),
  //   cell: ({ row }) => {
  //     const { role } = row.original
  //     const userType = userTypes.find(({ value }) => value === role)

  //     if (!userType) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center gap-x-2'>
  //         {userType.icon && (
  //           <userType.icon size={16} className='text-muted-foreground' />
  //         )}
  //         <span className='text-sm capitalize'>{row.getValue('role')}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
