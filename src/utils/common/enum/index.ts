export enum SYS_ROLE{
    user = "user",
    admin ="admin",
    superAdmin ="superAdmin"
}
export enum GENDER{
    male = "male",
    female = "female"
}

export enum USER_AGENT{
    local = "local",
    google = "google"
}

export enum ApiResponseStatus {
  Success = 'Success',
  Failure = 'Failure',
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  NotFound = 'Not Found',
  Conflict = 'Conflict',
}