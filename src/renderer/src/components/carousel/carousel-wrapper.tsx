import { ReactNode } from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './carousel-module.css'
import { cn } from '../../utils/helper';

interface Props {
    children: ReactNode
    className?: string;
}
const CarouselWrapper =
    ({ children, className }: Props) => {
        return (
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                className={cn(
                    "h-full w-full mb-4",
                    { className }
                )}
                pagination={{ clickable: false }}
                scrollbar={{ draggable: true }}
            >
                {children}
            </Swiper>
        )
    }

export default CarouselWrapper