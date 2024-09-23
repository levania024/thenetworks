import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Account } from "@/models/Account.js"

class ProfilesService{
//   async searchProfiles(value) {
//       const response = await api.get(`/api/profiles?query=${value}`)
//       logger.log('show profile',response.data)
//    }
   
   async getProfileById(profileId) {
        const response = await api.get(`/api/profiles/${profileId}`)
        logger.log('load profile',response.data)
        const newProfile = new Account(response.data)
        AppState.activeProfile = newProfile
    }
}
export const profilesService = new ProfilesService()