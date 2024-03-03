import { TakePartModal } from '@/shared/ui'
import { FC } from 'react'


export const ModalProvider: FC = () => {
    return (
        <div>
            <TakePartModal id='takePart' />
        </div>
    )
}