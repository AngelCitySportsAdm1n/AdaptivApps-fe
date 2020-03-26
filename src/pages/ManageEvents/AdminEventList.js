import React from 'react';
import { Flex, Input, Button, theme } from 'adaptiv-ui';
import { useMutation } from 'react-apollo';
import MaterialTable from 'material-table';
import AdminActivityList from './AdminActivityList';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './queries';

// This component contains a list of events, passed in as props
const AdminEventList = props => {
  // Declare Create, Update, and Delete mutation functions
  const [CreateEvent] = useMutation(CREATE_EVENT);
  const [UpdateEvent] = useMutation(UPDATE_EVENT);
  const [DeleteEvent] = useMutation(DELETE_EVENT);

  // Grab the events data from props
  const events = props.events;

  // This code is returning a material table object
  // For more info on material table, please visit their docs at
  // https://material-table.com/
  return (
    <Flex col m="0 0 0 1.5rem" w="90%">
      <MaterialTable
        title=""
        columns={[
          { title: 'Title', field: 'title' },
          {
            title: 'Start Date',
            field: 'startDate',
            editComponent: props => (
              <Input
                type="date"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          {
            title: 'End Date',
            field: 'endDate',
            editComponent: props => (
              <Input
                type="date"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                m="0 0 0 -0.5rem"
              />
            ),
          },
          { title: 'Location', field: 'location' },
          {
            title: 'Image Url',
            field: 'imgUrl',
            render: rowData => (
              <img
                style={{ height: 50, width: 50, borderRadius: '50%' }}
                src={rowData.imgUrl}
              />
            ),
          },
          {
            title: 'Details',
            field: 'details',
            editComponent: props => (
              <textarea
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            ),
          },
        ]}
        data={events}
        editable={{
          onRowAdd: async newData => {
            await CreateEvent({
              variables: {
                title: newData.title,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                details: newData.details,
              },
            });
            props.eventsRefetch();
          },
          onRowUpdate: async (newData, oldData) => {
            await UpdateEvent({
              variables: {
                id: newData.id,
                title: newData.title,
                startDate: newData.startDate,
                endDate: newData.endDate,
                location: newData.location,
                imgUrl: newData.imgUrl,
                details: newData.details,
              },
            });
            props.eventsRefetch();
          },
          onRowDelete: async oldData => {
            await DeleteEvent({
              variables: {
                id: oldData.id,
              },
            });
            props.eventsRefetch();
          },
        }}
        icons={{
          Add: () => (
            <Button primary border={`2px solid ${theme.primary}`}>
              Add Event
            </Button>
          ),
        }}
        detailPanel={[
          {
            tooltip: 'Show Activities',
            isFreeAction: true,
            render: rowData => {
              // When clicking on a row, display a list of activities associated
              // With the event
              const event_id = rowData.id;
              return <AdminActivityList event_id={event_id} />;
            },
          },
        ]}
        options={{
          cellStyle: {
            fontSize: '1.4rem',
          },
          headerStyle: {
            fontSize: '1.4rem',
            backgroundColor: '#2962FF',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#EEE',
          },
          emptyRowsWhenPaging: false,
          toolbarButtonAlignment: 'left',
        }}
      />
    </Flex>
  );
};

export default AdminEventList;
