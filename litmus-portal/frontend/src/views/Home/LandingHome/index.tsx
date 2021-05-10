import { Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { ButtonFilled, ButtonOutlined, Modal } from 'litmus-ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Role } from '../../../models/graphql/user';
import { getProjectRole } from '../../../utils/getSearchParams';
import { AgentDeployModal } from '../AgentDeployModal';
import { MainInfoContainer } from '../MainInfoContainer';
import { ProjectInfoContainer } from '../ProjectInfoContainer';

const LandingHome: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const projectRole = getProjectRole();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <div>
      {/* First Agent Deployment Container */}
      <MainInfoContainer
        src="./icons/agentDeploy.svg"
        alt="Deploy Agent"
        heading={t('homeViews.landingHome.heading')}
        description={t('homeViews.landingHome.description')}
        button={
          <ButtonFilled onClick={handleOpen}>
            <ArrowUpwardIcon />
            <Typography>{t('homeViews.landingHome.deploy')}</Typography>
          </ButtonFilled>
        }
      />
      <Modal
        height="50%"
        width="50%"
        open={modalOpen}
        onClose={handleClose}
        modalActions={
          <ButtonOutlined onClick={handleClose}>&#x2715;</ButtonOutlined>
        }
      >
        <AgentDeployModal handleClose={handleClose} />
      </Modal>
      {/* Project Level info container */}
      {projectRole === Role.owner && <ProjectInfoContainer />}
    </div>
  );
};

export { LandingHome };
