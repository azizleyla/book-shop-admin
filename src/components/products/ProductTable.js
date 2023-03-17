import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BooksApi from '../../api/booksApi';
import ApiQueryKeys from '../../constants/api.constant';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons"

const ProductTable = () => {
    const [books, setBooks] = useState();
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: [ApiQueryKeys.books],
        queryFn: () => BooksApi.getAll()
    })
    useEffect(() => {
        setBooks(data || [])
    }, [data])

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Şəkil",
            dataIndex: "images",
            key: "coverImage",
            render: (value) =>


                <img style={{ width: "100px", height: "100px" }} src={value[0]?.imgUrl} alt="book" />
        },
        {
            title: "Məhsulun adı",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Qiymət",
            dataIndex: "currentPrice",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Müəllif",
            dataIndex: "author",
            key: "author",
            sorter: (a, b) => a.author.localeCompare(b.author),
        },
        {
            title: "Dil",
            dataIndex: "language",
            key: "lang",
            render: (value) =>
                <span>{value.lang}</span>
        },
        {
            title: "",
            key: "action",
            width: 70,
            render: (value) =>
                <Space size="small">
                    <Link to="">
                        <EditOutlined style={{ color: 'green', fontSize: "17px" }} />
                    </Link>
                    <Button onClick={() => handleDelete(value.id)}>
                        <DeleteOutlined style={{ color: "red", fontSize: "17px", marginLeft: "30px" }} />
                    </Button>
                </Space>

        },

        {
            title: "",
            key: "view",
            widt: 40,
            render: () =>
                <Space size="small">
                    <Link to="">
                        <EyeOutlined style={{ fontSize: "17px" }} />
                    </Link>
                </Space>

        },

    ]
    const queryClient = useQueryClient()
    const deleteMutation = useMutation(BooksApi.deleteBook, {
        onSuccess: () => {
            queryClient.invalidateQueries([ApiQueryKeys.books])

        }
    })
    const handleDelete = (id) => {
        deleteMutation.mutate(id)
    }
    return (
        <div>
            <div className='flex flex-end' style={{ marginBottom: "30px" }}>
                <Button onClick={() => navigate("/products/add")} type='primary'>
                    <PlusOutlined />
                    Yeni Məhsul</Button>
            </div>
            <Table dataSource={books} columns={columns} />
        </div>
    )
}

export default ProductTable