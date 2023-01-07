import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { userService } from '../service';

const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await userService.getUserInfo(+userId);
  return res.status(sc.OK).send(success(sc.OK, rm.USER_INFO_GET_SUCCESS, data));
};

const getMysalespost = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { isSaled } = req.query;
  const status = isSaled === 'true' ? 1 : 0; // 1이 판매종료

  const data = await userService.getMysalespost(userId, status);
  return res.status(sc.OK).send(success(sc.OK, rm.SALESPOST_GET_SUCCESS, data));
};

const geyMyInfo = async (req: Request, res: Response) => {
  const { userId } = res.locals;

  const data = await userService.getMyInfo(+userId);
  return res.status(sc.OK).send(success(sc.OK, rm.USER_INFO_GET_SUCCESS, data));
};

const getMysuggests = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { isPurchased } = req.query;

  if (!isPurchased) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.GET_MY_SUGGEST_LIST_FAIL));
  }

  const data = await userService.getMysuggests(userId, isPurchased as string);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_MY_SUGGEST_LIST_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_MY_SUGGEST_LIST_SUCCESS, data));
};

const userController = {
  getMysalespost,
  getUserInfo,
  geyMyInfo,
  getMysuggests,
};

export default userController;
