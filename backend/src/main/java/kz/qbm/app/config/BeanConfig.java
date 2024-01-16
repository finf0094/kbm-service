package kz.qbm.app.config;

import kz.qbm.app.utils.NullAwareBeanUtilsBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public NullAwareBeanUtilsBean nullAwareBeanUtilsBean() {
        return new NullAwareBeanUtilsBean();
    }
}
