import axios from '../api/axios'
import { useBoundStore } from '../stores/store'

const useRefreshToken = () => {
  //const dispatch = useAppDispatch();
  const auth = useBoundStore((state) => state)
  const refreshToken = localStorage.getItem('refreshToken')
  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh-tokens', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refreshToken
        }
      })

      //setNewAuth(dispatch,{ roles:response.data.role,accessToken:response.data.accessToken,username:response.data.username});
      const tokens: {
        accessToken: string
        refreshToken: string
      } = {
        accessToken: response?.data.data.accessToken,
        refreshToken: response?.data.data.refreshToken
      }

      auth.login(tokens)
      return response?.data.data.accessToken
    } catch (error) {
      console.log(error)
      return 'err'
    }
  }
  return refresh
}

export default useRefreshToken
