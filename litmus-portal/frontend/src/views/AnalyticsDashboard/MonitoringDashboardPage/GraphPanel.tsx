import React from 'react';
import {
  PanelOption,
  PromQuery,
} from '../../../models/graphql/dashboardsDetails';
import { PrometheusResponse } from '../../../models/graphql/prometheus';
import PanelContainer from './PanelContainer';
import PanelContent from './PanelContent';

interface PContent {
  panel_id: string;
  prom_queries: PromQuery[];
  panel_options: PanelOption;
  panel_name: string;
  y_axis_left: string;
  y_axis_right: string;
  x_axis_down: string;
  unit: string;
  promData: PrometheusResponse | undefined;
  chaosEventQueries: string[];
}

const GraphPanel: React.FC<PContent> = ({ ...props }) => {
  return (
    <PanelContainer>
      <PanelContent {...props} />
    </PanelContainer>
  );
};

export default GraphPanel;
