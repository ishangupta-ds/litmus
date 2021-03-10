/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import { DateValue, GraphMetric, LineAreaGraph } from 'litmus-ui';
import React from 'react';
import {
  PanelOption,
  PromQuery,
} from '../../../models/graphql/dashboardsDetails';
import {
  PrometheusQueryInput,
  PrometheusResponse,
} from '../../../models/graphql/prometheus';
import useStyles from './styles';

interface PrometheusQueryDataInterface {
  promInput: PrometheusQueryInput;
  chaosInput: string[];
}

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

const filterUndefinedData = (data: GraphMetric[]): GraphMetric[] =>
  data
    ? data
        .filter((elem) => elem && elem.data && elem.data.length)
        .filter((elem) =>
          elem.data.filter(
            (d: DateValue) =>
              d &&
              d.date &&
              typeof d.date === 'number' &&
              typeof d.value === 'number'
          )
        )
    : data;
const PanelContent: React.FC<PContent> = ({
  panel_id,
  panel_name,
  panel_options,
  prom_queries,
  y_axis_left,
  y_axis_right,
  x_axis_down,
  unit,
  promData,
  chaosEventQueries,
}) => {
  const { palette } = useTheme();
  const classes = useStyles();
  const lineGraph: string[] = Object.values(palette.graph.line).map((elem) =>
    typeof elem === 'string' ? elem : palette.graph.dashboard.lightBlue
  );

  // const [
  //   prometheusQueryData,
  //   setPrometheusQueryData,
  // ] = React.useState<PrometheusQueryDataInterface>({
  //   promInput: {
  //     url: '',
  //     start: '',
  //     end: '',
  //     queries: [],
  //   },
  //   chaosInput: [],
  // });

  // const [updateQueries, setUpdateQueries] = React.useState<boolean>(false);

  // const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

  // const selectedDashboard = useSelector(
  //   (state: RootState) => state.selectDashboard
  // );

  // const selectedDataSource = useSelector(
  //   (state: RootState) => state.selectDataSource
  // );

  // // Apollo query to get the prometheus data
  // const { data: prometheusData, error } = useQuery<
  //   PrometheusResponse,
  //   PrometheusQueryVars
  // >(PROM_QUERY, {
  //   variables: { prometheusInput: prometheusQueryData.promInput },
  //   fetchPolicy: 'cache-and-network',
  //   pollInterval: selectedDashboard.refreshRate,
  // });

  // const generatePrometheusQueryData = () => {
  //   const promQueries: promQueryInput[] = [];
  //   const chaosQueries: string[] = [];
  //   prom_queries.forEach((query: PromQuery) => {
  //     if (query.prom_query_name.startsWith('litmuschaos_awaited_experiments')) {
  //       chaosQueries.push(query.queryid);
  //     }
  //     promQueries.push({
  //       queryid: query.queryid,
  //       query: query.prom_query_name,
  //       legend: query.legend,
  //       resolution: query.resolution,
  //       minstep: parseInt(query.minstep, 10),
  //     });
  //   });
  //   const prometheusQueryInput: PrometheusQueryInput = {
  //     url: selectedDataSource.selectedDataSourceURL,
  //     start: `${Math.round(new Date().getTime() / 1000) - 1800}`,
  //     end: `${Math.round(new Date().getTime() / 1000)}`,
  //     queries: promQueries,
  //   };
  //   setPrometheusQueryData({
  //     promInput: prometheusQueryInput,
  //     chaosInput: chaosQueries,
  //   });
  // };

  // useEffect(() => {
  //   if (firstLoad === true && updateQueries === false) {
  //     generatePrometheusQueryData();
  //     setFirstLoad(false);
  //     setUpdateQueries(true);
  //   }
  //   if (updateQueries === true && firstLoad === false) {
  //     setTimeout(() => {
  //       generatePrometheusQueryData();
  //     }, selectedDashboard.refreshRate);
  //   }
  // }, [prometheusQueryData]);

  let seriesData: Array<GraphMetric> = [
    { metricName: '', data: [{ date: NaN, value: NaN }] },
  ];
  let eventData: Array<GraphMetric> = [
    { metricName: '', data: [{ date: NaN, value: NaN }] },
  ];
  if (
    promData &&
    promData.GetPromQuery.length &&
    promData.GetPromQuery[0].legends?.length &&
    promData.GetPromQuery[0].legends !== null &&
    promData.GetPromQuery[0].legends[0] !== null
  ) {
    let seriesDataStore: GraphMetric[] = promData.GetPromQuery[0].legends.map(
      (elem, index) => ({
        metricName: elem[0] ?? 'test',
        data: promData.GetPromQuery[0].tsvs[index].map((dataPoint) => ({
          date: parseInt(dataPoint.timestamp ?? '0', 10) * 1000,
          value: parseFloat(dataPoint.value ?? '0.0'),
        })),
        baseColor: lineGraph[index % lineGraph.length],
      })
    );
    seriesData = seriesDataStore;

    promData.GetPromQuery.forEach((queryResponse) => {
      if (chaosEventQueries.includes(queryResponse.queryid)) {
        if (queryResponse.legends && queryResponse.legends[0]) {
          let eventDataStore: GraphMetric[] = queryResponse.legends.map(
            (elem, index) => ({
              metricName: elem[0] ?? 'test',
              data: queryResponse.tsvs[index].map((dataPoint) => ({
                date: parseInt(dataPoint.timestamp ?? '0', 10) * 1000,
                value: parseFloat(dataPoint.value ?? '0.0'),
              })),
              baseColor: 'red',
            })
          );
          eventData = eventDataStore;
        }
      }
    });
  }

  return (
    <div className={classes.rootPanel}>
      <div>
        {/* <Typography>panel_id: {panel_id}</Typography>
          <Typography>panel_name: {panel_name}</Typography>
          <Typography>
            panel_options: {JSON.stringify(panel_options)}
          </Typography>
          <Typography>
            panel_axes {y_axis_left}, {y_axis_right}, {x_axis_down}
          </Typography>
          <Typography>
            panel_unit: {unit}
          </Typography>
          <Typography>prom_queries: {JSON.stringify(prom_queries)}</Typography>
          <Typography>
            data_for_graph: {JSON.stringify(prometheusData)}
          </Typography> */}
        <Typography className={classes.title}>{panel_name}</Typography>
        {/* <Typography
          style={{ display: 'none' }}
        >{`${panel_id}-${panel_options.grids}`}</Typography> */}
        {/* panel_id and panel_options has been used temporaryly will be removed later */}
        <div className={classes.singleGraph}>
          <LineAreaGraph
            legendTableHeight={120}
            openSeries={filterUndefinedData(seriesData)}
            eventSeries={filterUndefinedData(eventData)}
            showPoints={false}
            showLegendTable
            showTips
            margin={{ left: 50, right: 20, top: 20, bottom: 10 }}
          />
        </div>
        {/* <Typography>
          data_for_graph: {JSON.stringify(prometheusData)}
        </Typography> */}
      </div>
    </div>
  );
};
export default PanelContent;
