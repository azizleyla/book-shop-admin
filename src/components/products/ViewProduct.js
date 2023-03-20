import { Button, Descriptions, Modal } from 'antd'
import React from 'react'

const ViewProduct = ({ isShowViewModal, selectedBook, setIsShowViewModal }) => {
    return (

        <Modal
            className='view-modal'
            style={{ width: "820px" }}
            open={isShowViewModal}
            footer={[
                <Button onClick={() => setIsShowViewModal(false)} key="back">
                    Bağla
                </Button>,
            ]}
            onCancel={() => setIsShowViewModal(false)}
        >
            <Descriptions bordered size="small">
                <Descriptions.Item label="Məhsulun kodu">{selectedBook?.productNo}</Descriptions.Item>
                <Descriptions.Item label={'Ad'}>
                    {selectedBook?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Müəllif">
                    {selectedBook?.author}
                </Descriptions.Item>
                {selectedBook?.prevPrice && <Descriptions.Item label="Əvvəlki qiymət">
                    {selectedBook?.prevPrice}
                </Descriptions.Item>}

                <Descriptions.Item label="Qiymət">
                    {selectedBook?.currentPrice}
                </Descriptions.Item>
                <Descriptions.Item label='Dil'>
                    {selectedBook?.language.lang}
                </Descriptions.Item>
                <Descriptions.Item label='Səhifə sayı'>
                    {selectedBook?.pageCount}
                </Descriptions.Item>
                <Descriptions.Item label='Reytinq'>
                    {selectedBook?.rating}
                </Descriptions.Item>
                <Descriptions.Item label="Anbarda" >
                    {selectedBook?.isStock ? 'mövcuddur' : " mövcud deyil"}
                </Descriptions.Item>
                <Descriptions.Item label="Yeni məhsul" >
                    {selectedBook?.isNew ? 'Yeni məhsuldur' : "deyil"}
                </Descriptions.Item>
            </Descriptions>

            <br />

        </Modal>

    )
}

export default ViewProduct