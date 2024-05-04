import { useState, useEffect } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import { supabase } from '../../../src/supabaseClient';

interface RowData {
  name: string;
  file_size: string;
  company: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(item).some((key) =>
      item[key] != null && item[key].toString().toLowerCase().includes(query)
    )
  );
}


function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}


export function TableSort({ data }: { data: RowData[] }) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(data); // Update sortedData when data changes
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const deletePdf = async (pdfName) => {
    try {
      let { error } = await supabase
        .storage
        .from('piano-pdfs')
        .remove([pdfName]);
  
      if (error) {
        throw error;
      } else {
        alert('PDF deleted successfully!');
        // Update local state to reflect the change
        setSortedData(sortedData.filter(item => item.name !== pdfName));
      }
    } catch (error) {
      alert('Failed to delete PDF: ' + error.message);
    }
  };

  const renamePdf = async (oldName, newName) => {
    if (!newName.trim()) {
        alert('Please enter a valid new name.');
        return;
    }

    try {
        const response = await axios.put(`/api/files/${oldName}/${newName}`);
        if (response.data) {
            alert('PDF renamed successfully!');
            // Update the local state to reflect the renamed file
            setSortedData(sortedData.map(item => {
                if (item.name === oldName) {
                    return { ...item, name: newName };
                }
                return item;
            }));
        }
    } catch (error) {
        alert('Failed to rename PDF: ' + error.message);
    }
};

const rows = sortedData.map((row) => {
  const [newName, setNewName] = useState(row.name); 

  return (
      <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>
              <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ marginRight: '10px' }}
              />
              <button onClick={() => renamePdf(row.name, newName)}>Rename</button>
          </Table.Td>
          <Table.Td>
              <button onClick={() => deletePdf(row.name)}>Delete</button>
          </Table.Td>
      </Table.Tr>
  );
});


return (
  <ScrollArea>
    <TextInput
      placeholder="Search by any field"
      mb="md"
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      value={search}
      onChange={handleSearchChange}
    />
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Tbody>
        <Table.Tr>
          <Th
            sorted={sortBy === 'name'}
            reversed={reverseSortDirection}
            onSort={() => setSorting('name')}
          >
            Name
          </Th>
        </Table.Tr>
      </Table.Tbody>
      <Table.Tbody>
        {rows.length > 0 ? rows : (
          <Table.Tr>
            <Table.Td colSpan={data.length > 0 ? Object.keys(data[0]).length : 1}>
              <Text fw={500} ta="center">
                Nothing found
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  </ScrollArea>
)};
