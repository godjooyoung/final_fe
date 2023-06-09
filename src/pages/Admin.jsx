import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchReportedUsers, handleReportProcessing } from '../axios/api/admin';
import { getCookie } from '../cookie/Cookie';
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [formatDate, setFormatDate] = useState([])
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery("getReportUser", fetchReportedUsers)
  const getAdmin = getCookie('admin')
  const navigate = useNavigate()

  const reportAllowMutation = useMutation(handleReportProcessing, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(fetchReportedUsers)
    }
  })

  const reportAllowHandler = (id) => {
    reportAllowMutation.mutate(id)
  }

  // data.data.data.createdAt 포맷변경
  useEffect(() => {
    if (data) {
      const formattedDates = data.data.data.map((e) => {
        const formattedDate = new Date(e.createdAt).toISOString().split('T')[0]
        formatDate.reverse().push(formattedDate)
        setFormatDate([...formatDate])
      })
    }
  }, [data])

  useEffect(() => {
    if (!getAdmin) {
      navigate('/')
    }
  }, [])
  
  return (
    <FlexBox>
      <AdminWrap>
        <h1>신고글 관리</h1>
        <ReportTypeContainer>
          <ReportTypeWrap>
            <p>신고 회원</p>
            <p>신고 대상</p>
            <p>신고 유형</p>
            <p>신고 상세내용</p>
          </ReportTypeWrap>
          <ReportingTime>신고 접수 일자</ReportingTime>
        </ReportTypeContainer>

        <ScrollBox>
          <ScrollWrap>
            {
              data && data?.data?.data?.slice().reverse().map((e, idx) => {
                return (
                  <ReportItem key={idx}>
                    <ReportCotentWrap>
                      <ReportContent>[{e.reporterNickname}]</ReportContent>
                      <ReportContent>[{e.declaredMember.nickname}]</ReportContent>
                      <ReportContent>{e.declaredReason}</ReportContent>
                      <ReportReason>{e.reason}</ReportReason>
                    </ReportCotentWrap>
                    <ReportProcessWrap>
                      {/* <ReportTime>{e.createdAt}</ReportTime> */}
                      <ReportTime>{formatDate[idx]}</ReportTime>
                      <ReportProcessBtn checked={e.checked} onClick={() => reportAllowHandler(e.id)}>{e.checked ? '완료' : '승인'}</ReportProcessBtn>
                    </ReportProcessWrap>

                  </ReportItem>
                )
              })
            }
          </ScrollWrap>
        </ScrollBox>
      </AdminWrap>
    </FlexBox>
  );
}

export const FlexBox = styled.div`
  display:flex;
  justify-content: center;
  height: calc(100vh - 79px);
`

export const AdminWrap = styled.div`
  width: calc(100% - 200px);
  height: calc(100% - 50px);
  h1 {
    font-size: 29px;
    font-family: Pretendard;
    font-weight: 500;
    color: #FFFFFF;
    margin-top: 40px;
  }
`;

export const ReportTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 25px;
  p {
    font-size: 17px;
    font-family: Pretendard;
    font-weight: 500;
    color: #FFFFFF;
  }
`

export const ReportTypeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 38px;
`
export const ReportingTime = styled.p`
  width: 190px;
  margin-right: 37px;
`
export const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const ScrollWrap = styled.div`
  height: calc(100vh - 300px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  gap: 31px;
  &::-webkit-scrollbar{
      width: 7px;
      background-color: transparent;
      border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
      /* width: 10px; */
      height: 10%; 
      background-color: white;
      border-radius: 10px;
      height: 30px;
  }

  &::-webkit-scrollbar-track {
      background-color: #626873;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      background-clip: padding-box;
  }
`

export const ReportItem = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 78px;
    height: 31px;
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  p {
    font-size: 13px;
    font-family: Pretendard;
    font-weight: 500;
    color: #FFFFFF;
  }

`
export const ReportProcessBtn = styled.button`
    width: 49.444px;
    height: 23.771px;
    text-align: center;
    font-size: 11px;
    font-family: Pretendard;
    font-weight: 700;
    color: #FFFFFF;
    border-radius: 13.312px;
    background-color: ${(props) =>
    props.checked ? '#4A4F59' : 'var(--po-de)'
  };
    color: ${(props) =>
    props.checked ? '#BEBEBE' : '#464646'
  };
    cursor: ${(props) =>
    props.checked ? 'default' : 'pointer'
  };
    border: none;
`

export const ReportCotentWrap = styled.div`
  display: flex;
  align-items: center;
`

export const ReportContent = styled.p`
  width: 100px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
`
export const ReportReason = styled.p`
  width: 384px;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ReportProcessWrap = styled.div`
  display: flex;
  width: 220px;
`
export const ReportTime = styled.div`
  width: 180px;
  height: 31px;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 500;
  color: #BEBEBE;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default Admin