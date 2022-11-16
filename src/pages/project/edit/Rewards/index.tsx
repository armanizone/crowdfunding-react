import React from 'react'

import { styles } from '../../../../pages/project/edit'
import { CreateButtons } from '../../../../components'
import EditReward from './EditReward';

import 'dayjs/locale/ru';
import Fees from './Fees';
import CreateReward from './CreateReward';
import { useDebouncedState } from '@mantine/hooks';

function Rewards() {

  const [reward, setReward] = useDebouncedState({
    title: '',
    description: '',
    how_to_get: '',
    image: '',
    cost: 0,
    count: 0,
    bought: 0,
    sending: new Date(),
  }, 800)

  const handleReward = (name: string, value: any) => {
    setReward({...reward, [name]: value})
  }

  const [loading, setLoading] = React.useState(false)

  const handleRewardLoading = (val: boolean) => setLoading(val)

  const [editReward, setEditReward] = React.useState<any>({
    title: '',
    description: '',
    how_to_get: '',
    image: '',
    cost: 0,
    count: 0,
    bought: 0,
    sending: new Date(),
  })

  const [editModal, setEditModal] = React.useState(false)

  const handleRewardEdit = (reward: any) => {
    setEditReward(reward)
    setEditModal(true)
  }
    
  return (
    <>
      <div>
        <div className={styles.row}>
          <CreateReward 
            handleReward={handleReward}
            handleRewardLoading={handleRewardLoading}
          />
          <Fees 
            reward={reward} 
            handleRewardEdit={handleRewardEdit} 
          />
        </div>
        <CreateButtons 
          loading={loading} 
          back='/edit/details' 
          forward='/edit/verification' 
        />
      </div>
      <EditReward 
        editReward={editReward} 
        editModal={editModal} 
        setEditModal={setEditModal} 
      />
    </>
  ) 
}

export default Rewards 