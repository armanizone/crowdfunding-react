import React from 'react'
import cn from 'classnames'
import { Tooltip } from '@mantine/core'
import { CgDanger } from 'react-icons/cg'

interface InputLabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
  children: React.ReactNode,
  description?: string,
  tooltip?: string
}

export const styles = {
  wrapper: 'border-t border-x border-slate-200 relative',
  box: 'sm:border-r border-slate-200 p-4',
  rowField: 'grid grid-cols-1 sm:grid-cols-[275px_auto] relative',
  restInfo: 'absolute bottom-1 right-1 text-xs text-slate-500',
  label: '  flex justify-between items-center',
  labelCol: 'flex-col items-start',
  labelName: 'text-base font-semibold whitespace-nowrap',
  labelIcon: 'text-xl text-blue-400',
  description: 'mt-2 text-slate-500 text-sm'
}

function CreateLabel({ children, label, tooltip, description, className, ...props }: InputLabelProps): JSX.Element {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.rowField}>
        <div className={styles.box}>
          <div className={styles.label}>
            <span className={styles.labelName}>
              {label}
            </span>
            {tooltip && (
              <Tooltip
                label={tooltip}
                withArrow
                multiline
                width={280}
                transition="fade"
                transitionDuration={200}
                color={'black'}
              >
                <span className={styles.labelIcon}>
                  <CgDanger />
                </span>
              </Tooltip>
            )}
          </div>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default CreateLabel