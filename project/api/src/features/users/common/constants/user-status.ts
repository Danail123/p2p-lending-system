import { UpdateUserStatus } from '../../enums/update-user-status';

export const USER_STATUS: any = {
    [UpdateUserStatus.Ban]: 'banUser',
    [UpdateUserStatus.UnBan]: 'unBanUser',
    [UpdateUserStatus.Delete]: 'deleteUser',
    [UpdateUserStatus.UnDelete]: 'unDeleteUser',
};
