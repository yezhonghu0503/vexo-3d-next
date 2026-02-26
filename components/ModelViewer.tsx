import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('@/components/ModelViewer.client'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full flex items-center justify-center bg-slate-100 rounded-xl">
      <div className="text-slate-500">模型加载中...</div>
    </div>
  )
});

export default ModelViewer;


