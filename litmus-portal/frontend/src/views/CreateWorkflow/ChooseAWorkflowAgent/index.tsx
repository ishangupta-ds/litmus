import { useLazyQuery } from '@apollo/client';
import { Typography, useTheme } from '@material-ui/core';
import { LitmusCard, RadioButton, Search } from 'litmus-ui';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GET_CLUSTER } from '../../../graphql';
import useActions from '../../../redux/actions';
import * as AlertActions from '../../../redux/actions/alert';
import * as WorkflowActions from '../../../redux/actions/workflow';
import { RootState } from '../../../redux/reducers';
import { getProjectID, getProjectRole } from '../../../utils/getSearchParams';
import useStyles from './styles';

interface Cluster {
  cluster_name: string;
  is_active: boolean;
  cluster_id: string;
  agent_namespace: string;
}

const ChooseWorkflowAgent = forwardRef((_, ref) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { palette } = useTheme();

  const workflow = useActions(WorkflowActions);
  const alert = useActions(AlertActions);

  const clusterid: string = useSelector(
    (state: RootState) => state.workflowData.clusterid
  );
  const selectedProjectID = getProjectID();

  const [clusterData, setClusterData] = useState<Cluster[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [currentlySelectedAgent, setCurrentlySelectedAgent] = useState<string>(
    ''
  );

  const [getCluster] = useLazyQuery(GET_CLUSTER, {
    onCompleted: (data) => {
      const clusters: Cluster[] = [];
      if (data && data.getCluster.length !== 0) {
        data.getCluster.forEach((e: Cluster) => {
          if (e.is_active === true) {
            // Populating all the cluster data in the clusters[] array
            clusters.push({
              cluster_name: e.cluster_name,
              is_active: e.is_active,
              cluster_id: e.cluster_id,
              agent_namespace: e.agent_namespace,
            });
            // Setting the initial workflow yaml to be of type Workflow
            workflow.setWorkflowDetails({
              clusterid: '',
              cronSyntax: '',
              scheduleType: {
                scheduleOnce: 'now',
                recurringSchedule: '',
              },
              scheduleInput: {
                hour_interval: 0,
                day: 1,
                weekday: 'Monday',
                time: new Date(),
                date: new Date(),
              },
              workflowIcon: '',
            });
          }
        });
        setClusterData(clusters);
      }
    },
    fetchPolicy: 'cache-and-network',
  });

  function onNext() {
    if (getProjectRole() === 'Viewer') {
      alert.changeAlertState(true);
      return false;
    }
    if (clusterid === '' || clusterData.length === 0) {
      alert.changeAlertState(true); // No Cluster has been selected and user clicked on Next
      return false;
    }
    return true;
  }

  // Rendering once to get the cluster data
  useEffect(() => {
    getCluster({ variables: { project_id: selectedProjectID } });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentlySelectedAgent(event.target.value);
  };

  // Filter the clusters based on search results
  const filteredCluster = clusterData.filter((cluster: Cluster) => {
    if (search === null) return cluster;
    if (cluster.cluster_name.toLowerCase().includes(search.toLowerCase()))
      return cluster;
    return null;
  });

  // Rendering atleast a few times till it updates the currentlySelectedAgent value
  useEffect(() => {
    if (currentlySelectedAgent !== '') {
      clusterData.forEach((cluster) => {
        if (currentlySelectedAgent === cluster.cluster_id) {
          workflow.setWorkflowDetails({
            clusterid: cluster.cluster_id,
            project_id: selectedProjectID,
            clustername: cluster.cluster_name,
            namespace: cluster.agent_namespace,
          });
        }
      });
    }
  }, [currentlySelectedAgent]);

  useImperativeHandle(ref, () => ({
    onNext,
  }));

  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        {/* Header */}
        <div aria-label="header" className={classes.header}>
          <div aria-label="headerLeft">
            <Typography className={classes.title}>
              <strong> {t('workflowAgent.header.chooseAgent')}</strong>
            </Typography>
            <Typography className={classes.subtitle}>
              {t('workflowAgent.header.creatingNew')} <br />
              {t('workflowAgent.header.selectAgent')}
            </Typography>
          </div>
          {/* Dart Icon */}
          <div aria-label="headerRight">
            <img src="./icons/dart.svg" className={classes.check} alt="Check" />
          </div>
        </div>

        <br />
        {/* Search Bar */}
        <Search
          data-cy="agentSearch"
          id="input-with-icon-textfield"
          placeholder={t('workflowAgent.search.placeholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Cluster Data */}
        <div className={classes.agentWrapperDiv}>
          {filteredCluster.map((cluster) => (
            <LitmusCard
              key={cluster.cluster_id}
              glow={currentlySelectedAgent === cluster.cluster_id}
              width="100%"
              height="4rem"
              className={classes.litmusCard}
              borderColor={
                currentlySelectedAgent === cluster.cluster_id
                  ? palette.primary.main
                  : palette.border.main
              }
            >
              <RadioButton
                value={cluster.cluster_id}
                className={classes.agentRadioButton}
                onChange={(e) => handleChange(e)}
              >
                {cluster.cluster_name} <br />
                {cluster.cluster_id}
              </RadioButton>
            </LitmusCard>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ChooseWorkflowAgent;
