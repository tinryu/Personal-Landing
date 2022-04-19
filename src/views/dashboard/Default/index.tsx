import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    // const [isLoading, setLoading] = useState(true);
    // useEffect(() => {
    //     setLoading(false);
    // }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <h1>EarningCard</h1>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <h1>TotalOrderLineChartCard</h1>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <h1>TotalIncomeDarkCard</h1>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <h1>TotalIncomeLightCard</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <h1>TotalGrowthBarChart</h1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <h1>PopularCard</h1>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
