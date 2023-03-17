import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Form, Input, InputNumber, Row, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BooksApi from '../../api/booksApi'
import ApiQueryKeys from '../../constants/api.constant'
import { requiredRule } from '../../utils/validationUtils'


const PhotoTypes = {
    COVER: "COVER",
    BACK: "BACK"
};

const ProductForm = () => {
    const [form] = Form.useForm()
    const [isNew, setIsNew] = useState(false);
    const [isStock, setIsStock] = useState(false)
    const [coverImage, setCoverImage] = useState("")
    const [backImg, setBackImg] = useState("")
    const queryClient = useQueryClient()

    const {id} = useParams();
    const { data } = useQuery({
        queryKey: [ApiQueryKeys.books],
        queryFn: () => BooksApi.getAll()
    })
    const selectedBook = data?.find(item => item.id ===Number(id))


useEffect(() =>{

form.setFieldsValue({
    productNo:selectedBook?.productNo,
    title:selectedBook?.title,
    currentPrice:selectedBook?.currentPrice,
    prevPrice:selectedBook?.prevPrice,
    desc:selectedBook?.desc,
    pageCount:selectedBook?.pageCount,
    rating:selectedBook?.rating,
    languageId:selectedBook?.language.lang,
    author:selectedBook?.author,
    qty:selectedBook?.qty,
    isStock:selectedBook?.isStock,
    isNew:selectedBook?.isNew
})
},[selectedBook])

    const navigate = useNavigate()
    const [photos, setPhotos] = useState({
        [PhotoTypes.COVER]: [],
        [PhotoTypes.BACK]: []
    });

    const addBookMutation = useMutation(BooksApi.addBook, {
        onSuccess: (data) => {
            if (data) {
                const id = data.id;

                const coverPhotosList = photos[PhotoTypes.COVER].map((photo) => {
                    const formData = new FormData();

                    formData.append("id", id);
                    formData.append("file", photo.file);
                    formData.append("type", "COVER");

                    return formData;
                });
                const backPhotoList = photos[PhotoTypes.BACK].map((photo) => {
                    const formData = new FormData();
                    formData.append('id', id);
                    formData.append("file", photo.file);
                    formData.append('type', 'BACK')
                    return formData;
                })
                const formDataList = [...coverPhotosList, ...backPhotoList]

                addImageMutation.mutate(formDataList)
            }

            queryClient.invalidateQueries([ApiQueryKeys.books])
            navigate('/products')
        }
    })


    const addImageMutation = useMutation(BooksApi.addImage, {
        onSuccess: () => {
            queryClient.invalidateQueries([ApiQueryKeys.books])
        }
    })


    const handlePhotoChange = async (e, type) => {
        if (e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();


        reader.onload = (e) => {
            const newPhoto = {
                id: crypto.randomUUID(),
                file,
                type,
                url: e.target.result,
            };
            if (type === 'COVER') {
                setCoverImage(e.target.result)
            }
            if (type === "BACK") {
                setBackImg(e.target.result)
            }


            setPhotos((prevPhotos) => ({
                ...prevPhotos,
                [type]: [...prevPhotos[type], newPhoto]
            }));

        };

        reader.readAsDataURL(e.target.files[0]);
    };
    const onSubmit = (values) => {
        const data = {
            ...values,
            isNew: isNew,
            isStock: isStock,
            qty: 1,
            isFavorite: false,
       


        }
        // delete data.coverImage
        // delete data.backImage



        addBookMutation.mutate(data)
    }
    useEffect(() =>{
        setCoverImage(selectedBook?.images[0].imgUrl)
    },[data])
    return (
        <Form
            form={form}
            layout="vertical"
            scrollToFirstError
            onFinish={onSubmit}
        >
            <Row gutter={[16]}>
                <Col md={12}>
                    <Form.Item label="Məhsulun kodu" name="productNo" rules={[requiredRule()]}>
                        <InputNumber placeholder='Məhsulun kodu' />
                    </Form.Item>
                </Col>
                <Col md={12}>
                    <Form.Item label="Məhsulun adı" name="title" rules={[requiredRule()]}>
                        <Input placeholder='Məhsulun adı' />
                    </Form.Item>

                </Col>
            </Row>
            <Col md={8}>
                <Form.Item label="Müəllif" name="author" rules={[requiredRule()]}>
                    <Input placeholder='Müəllif' />
                </Form.Item>
            </Col>
            <Row gutter={[8]}>
                <Col md={6}>
                    <Form.Item label="Öncəki qiymət" name="prevPrice">
                        <InputNumber placeholder='Qiymət' />
                    </Form.Item>
                </Col>
                <Col md={6}>

                    <Form.Item label="Qiymət" name="currentPrice" rules={[requiredRule()]}>
                        <InputNumber placeholder='Qiymət' />
                    </Form.Item>
                </Col>
                <Col md={6}>
                    <Form.Item label="Rating" name="rating" rules={[requiredRule()]}>
                        <InputNumber placeholder='Rating' />
                    </Form.Item>
                </Col>
                <Col md={6}>
                    <Form.Item label="Səhifə sayı" name="pageCount" rules={[requiredRule()]}>
                        <InputNumber placeholder='Səhifə sayı' />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16} >
                <Col md={6}>
                    <Form.Item label="Dil" name="languageId" rules={[requiredRule()]}>
                        <InputNumber placeholder="Dil" />
                    </Form.Item>
                </Col>
                <Col md={3}>
                    <Form.Item valuePropName='checked' label="Anbarda movcuddur" name="isStock">
                        <Switch onChange={(value) => setIsStock(value)} />
                    </Form.Item>
                </Col>
                <Col md={3}>
                    <Form.Item valuePropName='checked' label="Yeni məhsul" name="isNew">
                        <Switch onChange={(value) => setIsNew(value)} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="Açıqlama" name="desc" rules={[requiredRule()]}>
                <TextArea className='textarea-desc' />
            </Form.Item>
            <Row gutter={[16]}>
                <Col md={7}>
                    <Form.Item label="Ön Şəkil">
                        <Input onChange={(e) => handlePhotoChange(e, 'COVER')} type="file" />
                        <img style={{ width: "150px", height: "150px" }} src={coverImage} alt="" />
                    </Form.Item>
                </Col>
                <Col md={7}>
                    <Form.Item label="Arxa Şəkil">
                        <Input onChange={(e) => handlePhotoChange(e, 'BACK')} type="file" />
                        <img style={{ width: "150px", height: "150px" }} src={backImg} alt="" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <div className='flex flex-end'>
                    <Button type="primary" htmlType="submit">
                        Yadda saxla
                    </Button>
                </div>
            </Form.Item>

        </Form >
    )
}

export default ProductForm