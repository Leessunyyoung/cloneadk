
import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { KeywordJobStatusMap } from '../constants/KeywordRegistStatusList';
import { useState } from 'react';

export interface DataItem{
    createdAt: Date,
    mediaName: string,
    type: string,
    name: string,
    status: string,
    startAt:Date,
    endAt:Date,
    fileName:string,
    createdBy:string,
}

interface KeywordCheckTableProps {
    data: DataItem[];
  }
export default function KeywordCheckTable({ data }: KeywordCheckTableProps){
      const pageSize = 7;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(data.length / pageSize);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageData = data.map((item, index) => ({ ...item, id: index })).slice(startIndex,endIndex);
      const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
      };

    return(
        <>
        <TableContainer component={Paper} style={{width: '95%',marginLeft:'40px',maxHeight:'600px'}}>
            <Table aria-label="caption table" style={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="justify" sx={{width:'80px',height:'10px'}}>신청일</TableCell>
                        <TableCell align="center" sx={{width:'115px',height:'10px'}} >광고상품</TableCell>
                        <TableCell align="center" sx={{width:'70px',height:'10px'}}>작업구분</TableCell>
                        <TableCell align="center" sx={{width:'140px',height:'10px'}} >작업명</TableCell>
                        <TableCell align="center" sx={{width:'60px',height:'10px'}}>작업상태</TableCell>
                        <TableCell align="center" sx={{width:'80px',height:'10px'}}>수행시작</TableCell>
                        <TableCell align="center" sx={{width:'80px',height:'10px'}}>수행종료</TableCell>
                        <TableCell align="center" sx={{width:'85px',height:'10px'}}>등록파일</TableCell>
                        <TableCell align="center" sx={{width:'85px',height:'10px'}}>결과</TableCell>
                        <TableCell align="center" sx={{width:'60px',height:'10px'}}>대기취소</TableCell>
                        <TableCell align="center" sx={{width:'187px',height:'10px'}}>요청자</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageData.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row" style={{fontSize: '13.5px'}}>
                        {(() => {
                                const date = row.createdAt.toLocaleString().split(' ')[0];
                                const time = row.createdAt.toLocaleString().split(' ')[1];
                                return (
                                    <div>
                                        {date}<br />{time}
                                    </div>
                                );
                            })()}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px'}}>{row.mediaName}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>{row.type}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>{row.name}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px',textAlign:'center' }} >
                        {
                            (() => {
                            const statusText = row.status?.toString() || '';
                            const statusColor = KeywordJobStatusMap[statusText]?.color || '';
                            const text = KeywordJobStatusMap[statusText]?.text || '';
                            return (
                                <div
                                style={{
                                    color: statusColor,
                                    width: 'fit-content',
                                    fontWeight: 'bolder',
                                }}
                                dangerouslySetInnerHTML={{ __html: text }}
                                />
                            );
                            })()
                        }
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>
                            {(() => {
                                const date = row.startAt.toLocaleString().split(' ')[0];
                                const time = row.startAt.toLocaleString().split(' ')[1];
                                return (
                                    <div>
                                        {date}<br />{time}
                                    </div>
                                );
                            })()}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>
                            {(() => {
                                const date = row.endAt.toLocaleString().slice(0, 10);
                                const time = row.endAt.toLocaleString().slice(10);
                                return (
                                    <div>
                                        {date}<br />{time}
                                    </div>
                                );
                            })()}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>
                            <Button variant="outlined" color="error">
                            다운로드
                            </Button>
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>
                            {row.status === 'S' || row.status === 'P' ? (
                            <Button variant="outlined" color="error" >
                                다운로드
                            </Button>
                            ) : (
                            <Button variant="contained" disabled >
                                다운로드
                            </Button>
                            )}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>
                            <Button variant="contained" disabled>
                            취소
                            </Button>
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: '13.5px' }}>{row.createdBy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
             </TableContainer> 
             <Typography variant="body2" sx={{marginLeft:'1100px',float:'left',marginTop:'18px'}}>
                {currentPage} / {totalPages} 페이지
            </Typography>
             <Pagination
                variant="outlined" color="secondary"
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ padding:'10px',marginLeft:'1200px' }}
             />    
      </>
    );
}