import {
    Tooltip, Skeleton, Button, Popconfirm,
} from 'antd';
import {
    FaAngleDoubleRight, FaAngleDoubleLeft, FaRegFile, FaTimesCircle, FaPlus,
} from 'react-icons/fa';
import { useMemo } from 'react';
import { PageArray } from '@services/markdown';
import { MarkedInputMenu } from './index.styles';

interface Props {
    hideMarkdownMenu: boolean;
    setHideMarkdownMenu: (e: boolean) => void;
    isLoading: boolean;
    pageArray: PageArray[];
    subjectTitle: string | null;
    activePage: string;
    setActivePage: (e: string) => void;
    handlePageLink: (name: string, id: string, markdownId: string, urlId: string) => void;
    onConfirmRemove: (pageId: string, markdownId: string) => void;
    showNewPageModal: () => void;

}
const SideMenu = ({
    hideMarkdownMenu,
    setHideMarkdownMenu,
    isLoading,
    pageArray,
    subjectTitle,
    activePage,
    setActivePage,
    handlePageLink,
    onConfirmRemove,
    showNewPageModal,
}: Props) => {
    const filteredPages = useMemo(
        () => pageArray.filter((pages: any) => pages.subject_name === subjectTitle?.replace(/ /g, '-').toLowerCase()),
        [pageArray, subjectTitle]
    );

    return (
        <MarkedInputMenu $hideMarkdownMenu={hideMarkdownMenu}>
            {hideMarkdownMenu
                ? (
                    <Tooltip placement="right" title="Menu de páginas">
                        <FaAngleDoubleRight onClick={() => setHideMarkdownMenu(false)} />
                    </Tooltip>
                )
                : <FaAngleDoubleLeft onClick={() => setHideMarkdownMenu(true)} />}
            <section>
                <Skeleton loading={isLoading} active>
                    {filteredPages.map((page) => (
                        <div
                            id={page.page_id}
                            className={`${activePage === page.page_name && 'activePageLink'}`}
                            onClick={() => setActivePage(page.page_name)}
                        >
                            <FaRegFile />
                            <Button
                                id={page.page_id}
                                onClick={() => handlePageLink(page.page_name, page.page_id, page.markdown_id, page.url_id)}
                                type="text"
                            >
                                {page.page_name}
                            </Button>
                            <Popconfirm
                                placement="right"
                                title="Realmente deseja excluir está página?"
                                onConfirm={() => onConfirmRemove(page.page_id, page.markdown_id)}
                                okText="Sim"
                                cancelText="Não"
                            >
                                <Tooltip placement="right" title="Excluir página">
                                    <FaTimesCircle />
                                </Tooltip>
                            </Popconfirm>
                        </div>
                    ))}
                </Skeleton>
            </section>
            <footer onClick={showNewPageModal}>
                <FaPlus />
                Adicionar página
            </footer>
        </MarkedInputMenu>
    );
};

export default SideMenu;
