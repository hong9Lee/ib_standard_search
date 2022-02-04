-- arti 전체 쿼리
SELECT * FROM
    (SELECT
         concat(ARTI_ID,'_',BOD_ID,'_',ARTI_GRP) as UUID,
         ARTI_ID,
         BOD_ID,
         ARTI_GRP,
         DEPTH,
         TITLE,
         CONT,
         SCRT_YN,
         NOTI_YN,
         FILE_ID,
         (SELECT COUNT(ITEM_ID) FROM T_COM_FILE_ITEM WHERE T_COM_FILE_ITEM.FILE_ID = T_CMS_BOD_ARTI.FILE_ID) AS FILE_CNT,
         IFNULL((SELECT USER_NM FROM T_COM_USER WHERE T_COM_USER.USER_ID = T_CMS_BOD_ARTI.REG_ID), "") AS REG_NAME,
         (select COUNT(*) from t_cms_bod_arti sub where sub.ARTI_GRP=T_CMS_BOD_ARTI.ARTI_GRP and sub.`DEPTH` > 1 and sub.DEL_DTM is null) replyCnt,
         FILE_PRVIEW,
         HIT,
         REG_ID,
         REG_DTM,
         UPD_ID,
         UPD_DTM,
         DEL_ID,
         DEL_DTM,
         (SELECT COUNT(CMNT_ID) FROM T_CMS_BOD_CMNT WHERE T_CMS_BOD_CMNT.ARTI_ID = T_CMS_BOD_ARTI.ARTI_ID) AS CMNT_CNT,
         WRITER
     FROM
         T_CMS_BOD_ARTI
    ) BOD_INFO
WHERE
    BOD_INFO.DEL_DTM IS null;

-- 공지사항
SELECT * FROM
    (SELECT
         ARTI_ID,
         BOD_ID,
         ARTI_GRP,
         DEPTH,
         TITLE,
         CONT,
         SCRT_YN,
         NOTI_YN,
         FILE_ID,
         (SELECT COUNT(ITEM_ID) FROM T_COM_FILE_ITEM WHERE T_COM_FILE_ITEM.FILE_ID = T_CMS_BOD_ARTI.FILE_ID) AS FILE_CNT,
         IFNULL((SELECT USER_NM FROM T_COM_USER WHERE T_COM_USER.USER_ID = T_CMS_BOD_ARTI.REG_ID), "") AS REG_NAME,
         (select COUNT(*) from t_cms_bod_arti sub where sub.ARTI_GRP=T_CMS_BOD_ARTI.ARTI_GRP and sub.`DEPTH` > 1 and sub.DEL_DTM is null) replyCnt,
         FILE_PRVIEW,
         HIT,
         REG_ID,
         REG_DTM,
         UPD_ID,
         UPD_DTM,
         DEL_ID,
         DEL_DTM,
         (SELECT COUNT(CMNT_ID) FROM T_CMS_BOD_CMNT WHERE T_CMS_BOD_CMNT.ARTI_ID = T_CMS_BOD_ARTI.ARTI_ID) AS CMNT_CNT,
         WRITER
     FROM
         T_CMS_BOD_ARTI
    ) BOD_INFO
WHERE
    BOD_INFO.DEL_DTM IS null
  AND BOD_INFO.BOD_ID IN (1,5,9,13,17,21,25);

-- 자료실
SELECT * FROM
    (SELECT
         ARTI_ID,
         BOD_ID,
         ARTI_GRP,
         DEPTH,
         TITLE,
         CONT,
         SCRT_YN,
         NOTI_YN,
         FILE_ID,
         (SELECT COUNT(ITEM_ID) FROM T_COM_FILE_ITEM WHERE T_COM_FILE_ITEM.FILE_ID = T_CMS_BOD_ARTI.FILE_ID) AS FILE_CNT,
         IFNULL((SELECT USER_NM FROM T_COM_USER WHERE T_COM_USER.USER_ID = T_CMS_BOD_ARTI.REG_ID), "") AS REG_NAME,
         (select COUNT(*) from t_cms_bod_arti sub where sub.ARTI_GRP=T_CMS_BOD_ARTI.ARTI_GRP and sub.`DEPTH` > 1 and sub.DEL_DTM is null) replyCnt,
         FILE_PRVIEW,
         HIT,
         REG_ID,
         REG_DTM,
         UPD_ID,
         UPD_DTM,
         DEL_ID,
         DEL_DTM,
         (SELECT COUNT(CMNT_ID) FROM T_CMS_BOD_CMNT WHERE T_CMS_BOD_CMNT.ARTI_ID = T_CMS_BOD_ARTI.ARTI_ID) AS CMNT_CNT,
         WRITER
     FROM
         T_CMS_BOD_ARTI
    ) BOD_INFO
WHERE
    BOD_INFO.DEL_DTM IS null
AND BOD_INFO.BOD_ID IN (2,6,10,14,18,22,26);

-- FAQ
SELECT * FROM
    (SELECT
         ARTI_ID,
         BOD_ID,
         ARTI_GRP,
         DEPTH,
         TITLE,
         CONT,
         SCRT_YN,
         NOTI_YN,
         FILE_ID,
         (SELECT COUNT(ITEM_ID) FROM T_COM_FILE_ITEM WHERE T_COM_FILE_ITEM.FILE_ID = T_CMS_BOD_ARTI.FILE_ID) AS FILE_CNT,
         IFNULL((SELECT USER_NM FROM T_COM_USER WHERE T_COM_USER.USER_ID = T_CMS_BOD_ARTI.REG_ID), "") AS REG_NAME,
         (select COUNT(*) from t_cms_bod_arti sub where sub.ARTI_GRP=T_CMS_BOD_ARTI.ARTI_GRP and sub.`DEPTH` > 1 and sub.DEL_DTM is null) replyCnt,
         FILE_PRVIEW,
         HIT,
         REG_ID,
         REG_DTM,
         UPD_ID,
         UPD_DTM,
         DEL_ID,
         DEL_DTM,
         (SELECT COUNT(CMNT_ID) FROM T_CMS_BOD_CMNT WHERE T_CMS_BOD_CMNT.ARTI_ID = T_CMS_BOD_ARTI.ARTI_ID) AS CMNT_CNT,
         WRITER
     FROM
         T_CMS_BOD_ARTI
    ) BOD_INFO
WHERE
    BOD_INFO.DEL_DTM IS null
    AND BOD_INFO.BOD_ID IN (3,7,11,15,19,23,27);

-- QNA
SELECT * FROM
    (SELECT
         ARTI_ID,
         BOD_ID,
         ARTI_GRP,
         DEPTH,
         TITLE,
         CONT,
         SCRT_YN,
         NOTI_YN,
         FILE_ID,
         (SELECT COUNT(ITEM_ID) FROM T_COM_FILE_ITEM WHERE T_COM_FILE_ITEM.FILE_ID = T_CMS_BOD_ARTI.FILE_ID) AS FILE_CNT,
         IFNULL((SELECT USER_NM FROM T_COM_USER WHERE T_COM_USER.USER_ID = T_CMS_BOD_ARTI.REG_ID), "") AS REG_NAME,
         (select COUNT(*) from t_cms_bod_arti sub where sub.ARTI_GRP=T_CMS_BOD_ARTI.ARTI_GRP and sub.`DEPTH` > 1 and sub.DEL_DTM is null) replyCnt,
         FILE_PRVIEW,
         HIT,
         REG_ID,
         REG_DTM,
         UPD_ID,
         UPD_DTM,
         DEL_ID,
         DEL_DTM,
         (SELECT COUNT(CMNT_ID) FROM T_CMS_BOD_CMNT WHERE T_CMS_BOD_CMNT.ARTI_ID = T_CMS_BOD_ARTI.ARTI_ID) AS CMNT_CNT,
         WRITER
     FROM
         T_CMS_BOD_ARTI
    ) BOD_INFO
WHERE
    BOD_INFO.DEL_DTM IS null
    AND BOD_INFO.BOD_ID IN (4,8,12,16,20,24,28);







-- 공공생 인프라 관리
SELECT distinct
    concat(tpi.DEV_CD,'_',tpi.DEV_REG_ID) as UUID,
    tpi.DEV_CD
              ,tpi.DEV_NM_KO
              ,tpi.DEV_NM_EN
              ,tpi.DEV_REG_ID
              ,tpi.DEV_ORG
              ,tpi.MAKER
              ,tpi.MODEL
              ,tpi.USE_RANGE
              ,tpi.USE_TARGET
              ,tpi.RESERV_METH
              ,tpi.USE_METH
              ,tpi.DEV_DESC
              ,tpi.FEATURE
              ,tpi.USE_EX
              ,tpi.USE_INTRO
              ,tpi.CHARGE
              ,tpi.ASK_PH
              ,tpi.LOCATION
              ,tpi.REG_DTM
              ,tpi.DEL_DTM
              ,tpi.ZEUS_REG_ID
              ,tpi.file_id
              ,tpi.MANAGER_ID
              ,first_value(tcfi.ITEM_ID) over (partition by tpi.DEV_CD) IMG_ID
              ,first_value(tcfi.FILE_NM) over (partition by tpi.DEV_CD) IMG_NM
              ,first_value(tcfi.SAVE_FILE_NM) over (partition by tpi.DEV_CD) IMG_SAVE_NM
              ,first_value(tcfi.SAVE_PATH) over (partition by tpi.DEV_CD) IMG_SAVE_PATH
FROM T_PI_INFRA tpi
         left join t_com_file tcf on tcf.FILE_ID = tpi.FILE_ID
         left join t_com_file_item tcfi on tcfi.FILE_ID = tcf.FILE_ID
WHERE tpi.USE_YN = 'Y';


-- 조제관리사
select
    distinct
    concat(tpco.ORDER_CD,'_',tpco.RCP_CD) as UUID,
    tpco.ORDER_CD
           , tpco.RCP_CD
           , tpr.rcp_nm
           , tcu.USER_NM
           , tpr.REG_DTM
           , tpco.IMAGE_FILE_ID
           , tpco.ORDER_DT
           , tpr.SHAPE -- 제형
           , group_concat(tccd.CD_DTL_NM) as benefit -- 기대효능
            from t_pm_cosmetic_order tpco
         left join t_pm_recipe tpr on tpr.RCP_CD = tpco.RCP_CD
         left join t_com_user tcu on tcu.USER_ID = tpr.REG_ID
         left join t_pm_recipe_detail tprd on tprd.RCP_CD = tpco.RCP_CD
         left join t_com_cd_dtl tccd on tccd.CD_DTL_ID = tprd.BENEFFI_CD;
