import { Box, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import KeywordCheckTable from './KeywordCheckTable';
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import {DataItem}from './KeywordCheckTable';
import KeywordRegistStatusList from '../constants/KeywordRegistStatusList';
import { siteNo } from '../api/keywordJob';
  
export default function KeywordCheck(){
      const styles1 = {
        width:'1510px',
        height:'80px',
        display:'flex',
        
      };

      const [data,setData] = useState<DataItem[]>([]);
      const [searchText, setSearchText] = useState('');
      const [filteredData, setFilteredData] = useState<DataItem[]>([]);
      const [selectedStatus, setSelectedStatus] = useState('');


      const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        setSearchText(inputText);
      };

      const handleDelete = () =>{
        setSearchText('');
        setSelectedStatus('')
        setFilteredData(data);
      }

      const handleSearch = () => {
          if (searchText === '' && selectedStatus === '') {
          setFilteredData(data); // 검색어와 선택된 상태가 모두 없을 때
          }
          if (searchText !== '' && selectedStatus === '') { //검색어 썻을때 그리고 라디오버튼 선택안했을때
          const filteredResults = data.filter((item) =>
            Object.values(item).some((value) =>
              typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
            )
          );
          console.log(filteredResults); 
          setFilteredData(filteredResults);
        } else if (searchText === '' && selectedStatus !== '') {
          const filteredResults = data.filter((item) => {
            if (
              item.type &&
              typeof item.type === 'string' &&
              item.type.toLowerCase() === selectedStatus.toLowerCase()
            ) {
              return true;
            }
            return false;
          });
          console.log(filteredResults); 
          setFilteredData(filteredResults);
        }else {
          const filteredResults = data.filter((item) =>
            Object.values(item).some(
              (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchText.toLowerCase()) &&
                item.type.toLowerCase() === selectedStatus.toLowerCase()
            )
          );
          console.log(filteredResults); 
          setFilteredData(filteredResults);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await siteNo()
            const users: any = response.data;
            console.log(users);
            const contents: any[] = users.content;
            console.log(contents);
            const processedData = contents.map((item: any) => {
                const formattedStatus = item.createdAt ? item.createdAt.replace('T', ' ') : '';
                const startText = item.startAt ? item.startAt.replace('T',' ') : '';
                const endText = item.endAt ? item.endAt.replace('T','') : '';
                const matchedtype = KeywordRegistStatusList.find(
                  (status) => status.value === item.type
                );
                const typeText = matchedtype ? matchedtype.text : ""; 
                return {
                  createdAt: formattedStatus,
                  mediaName: item.mediaName,
                  type: typeText,
                  name: item.name,
                  status: item.status,
                  startAt: startText,
                  endAt: endText,
                  fileName: item.keywordJobNo,
                  createdBy: item.createdBy,
                };
              });
              setData(processedData);
              setFilteredData(processedData);
          } catch (error) {
            console.error('삐빅삐빅 에러입니다:', error);
          }
        };
        fetchData();
      }, []);

    return(
        <>
          <Box sx={styles1}>
            <div style={{width:'230px',height:'50px',marginTop:'20px',marginLeft:'700px'}}>
            <div style={{marginTop:'25px',fontWeight:'bold',fontSize:'13px',float:'left'}}>검색: </div>
              <TextField
                id="outlined-basic" value={searchText}
                onChange={handleSearchTextChange}
                label={<Typography style={{fontSize:'13px',marginTop:'2px'}}>검색어를입력하세유</Typography>}
                variant="outlined" 
                size="small" 
                style={{marginTop:'10px',marginRight:'1px',float:'right'}}/>
            </div>
            <div style={{width:'360px',height:'50px',marginTop:'20px'}}>
              <div style={{marginLeft:'30px',marginTop:'25px',fontWeight:'bold',fontSize:'13px',float:'left'}}>작업:</div>
              {KeywordRegistStatusList.map((item)=>(
                  <FormControlLabel 
                    key={item.value}
                    value="female" 
                    style={{marginTop:'13px'}} 
                    control={<Radio size="small" 
                    style= {{marginLeft:'5px'}}
                    checked={selectedStatus === item.text}
                    onChange={()=>{ setSelectedStatus(item.text);handleSearch()}}/>}
                    label={<Typography style={{fontSize:'13px',marginLeft:'-6px'}}>{item.text}</Typography>}/>
              ))}   
            </div>
                <Button variant="outlined" style={{width:'70px',height:'38px',marginTop:'30px'}} color="error" onClick={handleDelete}>비우기</Button>
                <Button variant="outlined" style={{width:'90px',height:'38px',marginLeft:'10px',marginTop:'30px'} }onClick={handleSearch}>검색하기</Button>
            </Box>
                <KeywordCheckTable data={filteredData} />

        </>
    );
}