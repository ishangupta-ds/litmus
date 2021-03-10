import React from 'react';
import { PanelResponse } from '../../../models/graphql/dashboardsDetails';
import { PrometheusResponse } from '../../../models/graphql/prometheus';
import PanelGroupContainer from './PanelGroupContainer';
import PanelGroupContent from './PanelGroupContent';

interface DBPanelGroup {
  panels: PanelResponse[];
  panel_group_name: string;
  panel_group_id: string;
  promData: PrometheusResponse | undefined;
  chaosEventQueries: string[];
}

const DashboardPanelGroup: React.FC<DBPanelGroup> = ({ ...props }) => {
  return (
    <PanelGroupContainer>
      <PanelGroupContent {...props} />
    </PanelGroupContainer>
  );
};

export default DashboardPanelGroup;
