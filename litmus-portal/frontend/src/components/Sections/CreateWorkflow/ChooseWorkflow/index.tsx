import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import useStyles, { CssTextField } from './styles';
import useActions from '../../../../redux/actions';
import * as WorkflowActions from '../../../../redux/actions/workflow';
import PredifinedWorkflows from '../../../PredifinedWorkflows';
import workflowsList from '../../../PredifinedWorkflows/data';
import Unimodal from '../../../../containers/layouts/Unimodal';
import ButtonFilled from '../../../Button/ButtonFilled';
import ButtonOutline from '../../../Button/ButtonOutline';
// import { getWkfRunCount } from "../../utils";

const ChooseWorkflow: React.FC = () => {
  const classes = useStyles();
  const workflow = useActions(WorkflowActions);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [workflowDetails, setWorkflowData] = useState({
    workflowName: 'Personal Workflow Name',
    workflowDesc: 'Personal Description',
  });

  const WorkflowNameChangeHandler = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    setWorkflowData({
      workflowName: (event.target as HTMLInputElement).value,
      workflowDesc: workflowDetails.workflowDesc,
    });
  };

  const WorkflowDescriptionChangeHandler = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    setWorkflowData({
      workflowName: workflowDetails.workflowName,
      workflowDesc: (event.target as HTMLInputElement).value,
    });
  };

  const handleSave = () => {
    workflow.setWorkflowDetails({
      name: workflowDetails.workflowName,
      description: workflowDetails.workflowDesc,
    });
    setOpen(false);
  };

  /*
	const { analyticsData } = useSelector(
		(state: RootState) => state
	);
  */

  useEffect(() => {
    workflow.setWorkflowDetails({
      name: 'Personal Workflow Name',
      description: 'Personal Workflow Description',
      yaml: '#You can start creating your own workflow from here.',
      weights: [],
      link: '',
      id: '',
      isCustomWorkflow: true,
    });
  }, []);

  const selectWorkflow = (index: number) => {
    setVisible(false);
    workflow.setWorkflowDetails({
      name: workflowsList[index].title,
      link: workflowsList[index].chaosWkfCRDLink,
      id: workflowsList[index].workflowID,
      yaml: 'none',
      description: workflowsList[index].description,
      isCustomWorkflow: workflowsList[index].isCustom,
    });

    setWorkflowData({
      workflowName: workflowsList[index].title,
      workflowDesc: workflowsList[index].description,
    });

    if (workflowsList[index].isCustom === true) {
      setOpen(true);
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <Typography className={classes.heading}>
          <strong>Select or design workflow</strong>
        </Typography>
        <Typography className={classes.description}>
          Select one of the pre-defined chaos workflows or design your own
          workflow.
        </Typography>
        <Divider variant="middle" className={classes.horizontalLine} />
        <div className={classes.cards}>
          <Typography className={classes.totalWorkflows}>
            {workflowsList.length} pre-defined workflows
          </Typography>
          <PredifinedWorkflows
            callbackOnSelectWorkflow={(index: number) => {
              selectWorkflow(index);
            }}
            workflows={workflowsList}
          />
          <div className={classes.paddedTop}>
            <ButtonFilled
              handleClick={() => {
                setOpen(true);
              }}
              isPrimary={false}
              isDisabled={visible}
            >
              <div>Edit workflow name</div>
            </ButtonFilled>
            <Typography className={classes.saved} display="inline">
              <strong>
                <span> &nbsp; &nbsp; &#10003;</span> &nbsp; Name saved as &quot;
                <Typography
                  id="SetName"
                  className={classes.selectionName}
                  display="inline"
                >
                  <strong>{workflowDetails.workflowName}</strong>
                </Typography>
                &quot;
              </strong>
            </Typography>
          </div>
        </div>
      </div>
      <Unimodal isOpen={open} handleClose={() => setOpen(false)} hasCloseBtn>
        <Typography className={classes.modalHeading} display="inline">
          Create your <strong>workflow name</strong>
        </Typography>
        <div className={classes.modalContainerBody}>
          <div className={classes.inputDiv}>
            <div className={classes.inputArea}>
              <CssTextField
                id="filled-workflowname-input"
                label="Workflow name"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.resizeName,
                  },
                }}
                data-cy="inputWorkflow"
                className={classes.textfieldworkflowname}
                onChange={WorkflowNameChangeHandler}
                value={workflowDetails.workflowName}
                autoFocus
              />
            </div>
            <div className={classes.inputAreaDescription}>
              <CssTextField
                id="filled-workflowdescription-input"
                label="Description"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.resize,
                  },
                }}
                data-cy="inputWorkflowDescription"
                className={classes.textfieldworkflowdescription}
                value={workflowDetails.workflowDesc}
                onChange={WorkflowDescriptionChangeHandler}
                multiline
                rows={12}
              />
            </div>
          </div>
          <div className={classes.buttons}>
            <div className={classes.cancelButton}>
              <ButtonOutline
                handleClick={() => setOpen(false)}
                isDisabled={false}
              >
                <div>Cancel</div>
              </ButtonOutline>
            </div>
            <div className={classes.saveButton}>
              <ButtonFilled
                isPrimary={false}
                isDisabled={false}
                handleClick={() => handleSave()}
              >
                <div>Save</div>
              </ButtonFilled>
            </div>
          </div>
        </div>
      </Unimodal>
    </div>
  );
};

export default ChooseWorkflow;
