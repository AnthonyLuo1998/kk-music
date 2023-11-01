export interface UserInfoProps {
  userId: string | number
  username: string
  avatar?: string
  desc?: string
  homePath?: string
  roles: Array<string>
  likes: Array<string>
}
