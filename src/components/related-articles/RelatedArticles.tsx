import React from 'react';
import { motion } from 'framer-motion';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Design System Typography
const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Arrow Icon
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
  </svg>
);

// Clock Icon
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  href: string;
  image?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

interface RelatedArticlesProps {
  title?: string;
  articles: Article[];
  variant?: 'grid' | 'list' | 'minimal' | 'featured';
  columns?: 2 | 3 | 4;
  showExcerpt?: boolean;
  showImage?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  onArticleClick?: (article: Article) => void;
  className?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  title = 'Related Articles',
  articles,
  variant = 'grid',
  columns = 3,
  showExcerpt = true,
  showImage = true,
  showAuthor = false,
  showTags = false,
  accentColor = 'orange',
  onArticleClick,
  className = ''
}) => {
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed
  };

  const currentAccent = accentColors[accentColor];

  const handleArticleClick = (article: Article) => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  // Grid columns configuration
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const renderArticleCard = (article: Article, index: number) => {
    const cardContent = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <div
          className="h-full flex flex-col cursor-pointer group"
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
          }}
          onClick={() => handleArticleClick(article)}
        >
          {/* Category Badge */}
          <div
            className={`${typography.caption} uppercase px-3 py-1`}
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: currentAccent,
              color: colors.white,
              border: `2px solid ${colors.black}`,
              boxShadow: `2px 2px 0px ${colors.black}`,
              zIndex: 10,
              fontWeight: 700
            }}
          >
            {article.category}
          </div>

          {/* Image */}
          {showImage && article.image && (
            <div
              style={{
                height: '200px',
                background: colors.steel,
                borderBottom: `3px solid ${colors.black}`,
                overflow: 'hidden'
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                className="group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Title */}
            <h3 
              className={`${typography.headingS} mb-3 group-hover:underline`}
              style={{ 
                color: colors.black,
                textDecorationThickness: '3px',
                textUnderlineOffset: '4px'
              }}
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            {showExcerpt && article.excerpt && (
              <p 
                className={`${typography.bodyS} mb-4 flex-1`}
                style={{ color: colors.charcoal }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Tags */}
            {showTags && article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`${typography.caption} uppercase px-2 py-1`}
                    style={{
                      background: colors.concrete,
                      border: `2px solid ${colors.black}`,
                      fontWeight: 600
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between mt-auto">
              {/* Author */}
              {showAuthor && article.author && (
                <div className="flex items-center gap-2">
                  {article.author.avatar && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        border: `2px solid ${colors.black}`,
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <span 
                    className={typography.caption}
                    style={{ color: colors.charcoal }}
                  >
                    {article.author.name}
                  </span>
                </div>
              )}

              {/* Date & Read Time */}
              <div className="flex items-center gap-3 text-right">
                <span 
                  className={typography.caption}
                  style={{ color: colors.graphite }}
                >
                  {article.date}
                </span>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" style={{ color: colors.graphite }} />
                  <span 
                    className={typography.caption}
                    style={{ color: colors.graphite }}
                  >
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              background: colors.black,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(45deg)',
              transition: 'transform 0.2s ease'
            }}
            className="group-hover:scale-110"
          >
            <ArrowIcon 
              className="w-4 h-4" 
              style={{ 
                color: colors.white,
                transform: 'rotate(-45deg)'
              }} 
            />
          </div>
        </div>
      </motion.div>
    );

    return article.href ? (
      <a key={article.id} href={article.href} className="block h-full">
        {cardContent}
      </a>
    ) : (
      <div key={article.id}>
        {cardContent}
      </div>
    );
  };

  // List variant
  const renderListItem = (article: Article, index: number) => {
    const listContent = (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div
          className="flex gap-4 cursor-pointer group"
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '20px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
          }}
          onClick={() => handleArticleClick(article)}
        >
          {/* Number */}
          <div
            style={{
              width: '48px',
              height: '48px',
              background: currentAccent,
              border: `3px solid ${colors.black}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 900,
              fontSize: '24px',
              color: colors.white
            }}
          >
            {(index + 1).toString().padStart(2, '0')}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 
                className={`${typography.headingS} group-hover:underline`}
                style={{ 
                  color: colors.black,
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '4px'
                }}
              >
                {article.title}
              </h3>
              <span
                className={`${typography.caption} uppercase`}
                style={{
                  background: colors.concrete,
                  padding: '4px 12px',
                  border: `2px solid ${colors.black}`,
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {article.category}
              </span>
            </div>
            
            {showExcerpt && article.excerpt && (
              <p 
                className={`${typography.bodyS} mb-2`}
                style={{ color: colors.charcoal }}
              >
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4">
              <span 
                className={typography.caption}
                style={{ color: colors.graphite }}
              >
                {article.date}
              </span>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" style={{ color: colors.graphite }} />
                <span 
                  className={typography.caption}
                  style={{ color: colors.graphite }}
                >
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowIcon 
              className="w-6 h-6 transition-transform group-hover:translate-x-2" 
              style={{ color: colors.black }} 
            />
          </div>
        </div>
      </motion.div>
    );

    return article.href ? (
      <a key={article.id} href={article.href} className="block">
        {listContent}
      </a>
    ) : (
      <div key={article.id}>
        {listContent}
      </div>
    );
  };

  // Minimal variant
  const renderMinimalItem = (article: Article, index: number) => {
    const minimalContent = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <div
          className="flex items-center justify-between cursor-pointer group"
          style={{
            padding: '16px 0',
            borderBottom: index < articles.length - 1 ? `2px solid ${colors.black}` : 'none'
          }}
          onClick={() => handleArticleClick(article)}
        >
          <div className="flex-1">
            <h4 
              className={`${typography.bodyM} font-semibold group-hover:underline`}
              style={{ 
                color: colors.black,
                textDecorationThickness: '2px',
                textUnderlineOffset: '2px'
              }}
            >
              {article.title}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span 
                className={`${typography.caption} uppercase`}
                style={{ 
                  color: currentAccent,
                  fontWeight: 700
                }}
              >
                {article.category}
              </span>
              <span 
                className={typography.caption}
                style={{ color: colors.graphite }}
              >
                {article.readTime}
              </span>
            </div>
          </div>
          <ArrowIcon 
            className="w-5 h-5 transition-transform group-hover:translate-x-2" 
            style={{ color: colors.black }} 
          />
        </div>
      </motion.div>
    );

    return article.href ? (
      <a key={article.id} href={article.href} className="block">
        {minimalContent}
      </a>
    ) : (
      <div key={article.id}>
        {minimalContent}
      </div>
    );
  };

  // Featured variant (first article large, rest small)
  const renderFeaturedGrid = () => {
    if (articles.length === 0) return null;

    const [featured, ...rest] = articles;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <a href={featured.href} className="block h-full">
            <div
              className="h-full cursor-pointer group"
              style={{
                background: colors.white,
                border: `4px solid ${colors.black}`,
                boxShadow: `6px 6px 0px ${colors.black}`,
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = `9px 9px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
              }}
            >
              {/* Featured Badge */}
              <div
                className={`${typography.caption} uppercase px-3 py-1`}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: colors.crimsonRed,
                  color: colors.white,
                  border: `2px solid ${colors.black}`,
                  boxShadow: `2px 2px 0px ${colors.black}`,
                  zIndex: 10,
                  fontWeight: 700
                }}
              >
                Featured
              </div>

              {/* Image */}
              {featured.image && (
                <div
                  style={{
                    height: '300px',
                    background: colors.steel,
                    borderBottom: `4px solid ${colors.black}`,
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    className="group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                <span
                  className={`${typography.caption} uppercase`}
                  style={{
                    color: currentAccent,
                    fontWeight: 700
                  }}
                >
                  {featured.category}
                </span>
                <h3 
                  className={`${typography.headingL} mt-2 mb-3 group-hover:underline`}
                  style={{ 
                    color: colors.black,
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '4px'
                  }}
                >
                  {featured.title}
                </h3>
                <p 
                  className={`${typography.bodyM} mb-4`}
                  style={{ color: colors.charcoal }}
                >
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span 
                    className={typography.bodyS}
                    style={{ color: colors.graphite }}
                  >
                    {featured.date}
                  </span>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" style={{ color: colors.graphite }} />
                    <span 
                      className={typography.bodyS}
                      style={{ color: colors.graphite }}
                    >
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Other Articles */}
        <div className="space-y-4">
          {rest.slice(0, 3).map((article, index) => renderMinimalItem(article, index + 1))}
        </div>
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      {/* Header */}
      {title && (
        <div className="mb-8">
          <h2 
            className={typography.displayS}
            style={{ color: colors.black }}
          >
            {title}
          </h2>
          <div
            style={{
              width: '80px',
              height: '6px',
              background: currentAccent,
              marginTop: '16px',
              border: `2px solid ${colors.black}`,
              boxShadow: `2px 2px 0px ${colors.black}`
            }}
          />
        </div>
      )}

      {/* Articles */}
      {variant === 'grid' && (
        <div className={`grid ${getGridCols()} gap-6`}>
          {articles.map((article, index) => renderArticleCard(article, index))}
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-4">
          {articles.map((article, index) => renderListItem(article, index))}
        </div>
      )}

      {variant === 'minimal' && (
        <div
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '24px'
          }}
        >
          {articles.map((article, index) => renderMinimalItem(article, index))}
        </div>
      )}

      {variant === 'featured' && renderFeaturedGrid()}
    </motion.section>
  );
};