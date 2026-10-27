"use client";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <section className="not-found"><p className="eyebrow-label" style={{justifyContent:"center"}}><span/>Something went wrong</p><h1>The workspace hit a snag.</h1><p>Try loading this page again.</p><button className="primary-button" onClick={reset}>Try again</button></section>}
