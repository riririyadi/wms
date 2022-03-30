import React from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol, CInputGroup, CFormInput } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

export default class Dashboard extends React.Component {
    render() {
        return (
            <CCard className="mb-4">
                <CCardHeader>Welcome</CCardHeader>
                <CCardBody>
                    <CCol>
                        <CRow>
                            <CInputGroup size="md" style={{paddingBottom: "10px"}}>
                                <CButton color="primary" style={{maxWidth: "100px"}}>Refresh</CButton>
                            </CInputGroup>
                        </CRow>
                        <CRow>
                            <CInputGroup size="md" style={{gap: "10px", paddingBottom: "10px"}}>
                                <CFormInput
                                    size="md"
                                    type="date"
                                />
                                <CFormInput
                                    size="md"
                                    type="date"
                                />
                            </CInputGroup>
                        </CRow>
                        <CRow>
                            <h2 style={{textAlign: 'center'}}>WMS Chart Today already outbound 282, not outbound 261</h2>
                        </CRow>
                        <CRow>
                            <CChartBar
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                {
                                    label: 'Transaction',
                                    backgroundColor: '#f87979',
                                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                },
                                ],
                            }}
                            labels="months"
                            />
                        </CRow>
                    </CCol>
                </CCardBody>
            </CCard>
        )
    }
}