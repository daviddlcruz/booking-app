import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import WorkingHours from "@/Pages/Admin/Employee/Partials/WorkingHours.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import {Box, Button, Grid, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import {lazy, useEffect, useState, Suspense} from "react";
import Profile from "@/Pages/Admin/Employee/Partials/Profile.jsx";

const formData = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: null,
    phoneNumber: "",
    timeZone: "",
}

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    children: PropTypes.node
};
export default function Index({ auth, timeIntervals, workingHours, employee = null }) {
    const { errors } = usePage().props

    const EmployeeProfile = lazy(() => import('@/Pages/Admin/Employee/Partials/Profile.jsx'));

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    };

    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>}
        >
            <Head title="Employeess" />

            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
                            <Tab label="Profile" component={Link} href={route('admin.employee.create')} {...a11yProps(0)} />
                            <Tab label="Working hours" {...a11yProps(1)} />
                            <Tab label="Special dates" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TabPanel value={value} index={0}>
                            <EmployeeProfile auth={auth} employee={employee}/>
                        </TabPanel>
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TabPanel value={value} index={1}>
                            <WorkingHours
                                intervals={timeIntervals}
                                workingHours={workingHours}
                            />
                        </TabPanel>
                    </Suspense>
                    <TabPanel value={value} index={2}>
                        <WorkingHours/>
                    </TabPanel>
                </Box>
            </Paper>


        </NewAuthenticatedLayout>
    );
}
