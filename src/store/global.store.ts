import { useLocalStorage } from 'usehooks-ts'
import { Member } from './store.type'
import { useEffect, useState } from 'react'

export const useGlobalStore = () => {
  const [members, setMembers, removeMembers] = useLocalStorage<Member[]>('members', [])
  const [totalMembers, setTotalMembers] = useState(0)
  const [activeMembers, setActiveMembers] = useState(0)
  const [paymentComingMembersIds, setPaymentComingMembersIds] = useState<number[]>([])
  useEffect(() => {
    setTotalMembers(members.length)
  }, [members])

  useEffect(() => {
    setActiveMembers(members.filter(member => new Date(member.memberEndDate) >= new Date()).length)
  }, [members])

  useEffect(() => {
    const today = new Date()
    const threeDaysFromNow = new Date(today)
    threeDaysFromNow.setDate(today.getDate() + 3)
    setPaymentComingMembersIds(
      members.filter((member) => {
        const endDate = new Date(member.memberEndDate)
        return endDate >= today && endDate <= threeDaysFromNow
      }).map((member) => member.id)
    )
  }, [members])


  return {
    members,
    setMembers,
    removeMembers,
    totalMembers,
    activeMembers,
    paymentComingMembersIds,
  }
}
